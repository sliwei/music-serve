local NAME="music-serve";
local SOURCE="/data/docker/awei/" + NAME+"/source/";

[
  {
    "kind": "pipeline",
    "type": "docker",
    "name": "deploy",
    "steps": [
      {
        "name": "restore-cache",
        "image": "drillster/drone-volume-cache",
        "settings": {
          "restore": true,
          "mount": [
            "./node_modules"
          ]
        },
        "volumes": [
          {
            "name": "cache",
            "path": "/cache"
          }
        ]
      },
      {
        "name": "build & copy",
        "image": "node:14.17.1-alpine",
        "volumes": [
          {
            "name": "source-conf",
            "path": SOURCE
          }
        ],
        "commands": [
          "yarn",
          "yarn build:live",
          "mkdir -p "+SOURCE, # 创建源码目录
          "rm -rf "+SOURCE+"*", # 删除以前的源码
          "cp -rf Dockerfile node_modules dist "+SOURCE
        ]
      },
// 太耗时了，改用ssh
//      {
//        "name": "docker build&&push",
//        "image": "plugins/docker",
//        "settings": {
//          "username": "admin",
//          "password": {
//            "from_secret": "registry_password"
//          },
//          "repo": "registry.bstu.cn/admin/"+NAME,
//          "registry": "registry.bstu.cn"
//        }
//      },
      {
        "name": "rebuild-cache",
        "image": "drillster/drone-volume-cache",
        "settings": {
          "rebuild": true,
          "mount": [
            "./node_modules"
          ]
        },
        "volumes": [
          {
            "name": "cache",
            "path": "/cache"
          }
        ]
      },
      {
        "name": "docker build && up",
        "image": "appleboy/drone-ssh",
        "settings": {
          "host": "bstu.cn",
          "username": "root",
          "password": {
            "from_secret": "ssh_key"
          },
          "port": 22,
          "command_timeout": "10m",
          "script_stop": false,
          "script": [
            "cd "+SOURCE,
            "docker build -t "+NAME+" .",
            "cd ..",
            "docker compose up -d"
          ]
        }
      },
      {
        "name": "notify",
        "pull": "if-not-exists",
        "image": "guoxudongdocker/drone-dingtalk:latest",
        "settings": {
          "token": {
            "from_secret": "dingtalk_token"
          },
          "type": "markdown",
          "message_color": true,
          "message_pic": true,
          "sha_link": true
        },
        "when": {
          "status": [
            "failure",
            "success"
          ]
        }
      }
    ],
    "volumes": [
      {
        "name": "source-conf",
        "host": {
          "path": SOURCE
        }
      },
      {
        "name": "cache",
        "host": {
          "path": "/tmp/cache"
        }
      }
    ]
  }
]
