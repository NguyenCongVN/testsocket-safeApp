import "./App.css";
import { useEffect, useRef, useState } from "react";
import * as io from "socket.io-client";

function App() {
  const [token, setToken] = useState("");
  const [inputToken, setInputToken] = useState("");
  var socket = useRef(null) 
  useEffect(() => {
    if(token !== '')
    {
      socket.current = io("https://murmuring-beyond-51639.herokuapp.com", {
      auth: {
        token: token,
      },
    });
      socket.current.on("connect", () => {
        console.log("Kết nối thành công");
      });
  
      socket.current.on("connect_error", (err) => {
        console.log(err.message);
      });
  
      socket.current.on("disconnect", () => {
        console.log("Mất kết nối với server");
      });
  
      socket.current.on("thongBao", (data) => {
        console.log(data);
      });

      socket.current.on("dongBoThongTinTruyCapThanhCong", (data) => {
        console.log('Thành công')
        console.log(data);
      });

      socket.current.on('taoThongTinTruyCapLoi' , data => {
        console.log(data)
      })
      socket.current.on('taoThongTinTruyCapThanhCong' , data => {
        console.log(data)
      })

      socket.current.on("dongBoThongTinTruyCapLoi", (data) => {
        console.log('Có lỗi xảy ra')
        console.log(data);
      });

      socket.current.on("thongTinTruyCap", (data) => {
        console.log(data)
        socket.current.emit('yeuCauXacNhanDongBoLichSuTruyCap')
      })

      socket.current.on("dongBoLichSuLoi", (data) => {
        console.log(data)
      })

      socket.current.on("xacThucDongBoLichSuLoi", (data) => {
        console.log(data)
      })

      socket.current.on("xacThucDongBoLichSuThanhCong", (data) => {
        console.log(data)
      })
      
      console.log("creating event");
      // socket.current.emit("taoThongTinTruyCap", {
      //   url: "gooogle.com",
      //   tinhTrang: "DaChan",
      // });
      socket.current.emit('dongBoLichSuTruyCap')
    }
    
  }, [token]);
  return (
    <div className="App">
      <div>
        <input onChange={(e) => {
          console.log(e.target.value)
          setInputToken(e.target.value)
        }} />
        <button onClick={() =>{
          setToken(inputToken)
        }}> Set token </button> 
      </div>
    </div>
  );
}

export default App;
