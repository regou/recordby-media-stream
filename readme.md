# 通过WebRTC来录制视频（实验）

- Clone the repo


```
npm install -g http-server
```

```
$ http-server
```

- Open `http://localhost:8080` click Record Clock



原理: 

- [x] MediaStreamAPI Capture Canvas获取MediaStream Object
- [x] 用createObjectURL来获取MediaStream Object URL (MOU)
- [ ] 可停止MediaStream
- [ ] 可通过MOU下载文件

