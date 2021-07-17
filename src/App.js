import "./App.css";
import { useEffect, useRef, useState } from "react";
import * as io from "socket.io-client";

function App() {
  const [token, setToken] = useState("");
  const [inputToken, setInputToken] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [url, setUrl] = useState("");
  var socket = useRef(null);
  const [maDongBoLichSuHienTai, setMaDongBo] = useState(null);
  const [maDongBoBlackListHienTai , setMaDongBoBlackList] = useState(null);
  useEffect(() => {
    if (token !== "") {
      socket.current = io("localhost:4000", {
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
        console.log("Thành công");
        console.log(data);
      });

      socket.current.on("taoThongTinTruyCapLoi", (data) => {
        console.log(data);
      });
      socket.current.on("taoThongTinTruyCapThanhCong", (data) => {
        console.log(data);
      });

      socket.current.on("dongBoThongTinTruyCapLoi", (data) => {
        console.log("Có lỗi xảy ra");
        console.log(data);
      });

      socket.current.on("thongTinTruyCap", (data) => {
        console.log(data);
        socket.current.emit("yeuCauXacNhanDongBoLichSuTruyCap");
      });

      socket.current.on("dongBoLichSuLoi", (data) => {
        console.log(data);
      });

      socket.current.on("xacThucDongBoLichSuLoi", (data) => {
        console.log(data);
      });

      socket.current.on("xacThucDongBoLichSuThanhCong", (data) => {
        console.log("Ma dong bo : " + data.toString());
        setMaDongBo(data);
      });

      socket.current.on("yeuCauCapNhatLichSu", (data) => {
        console.log(data);
        socket.current.emit("capNhatLichSuThanhCong");
      });

      socket.current.on('dongBoBlackListLoi' , (data) => {
        console.log(data)
      })

      socket.current.on('thongTinCapNhatBlackList' , (data) => {
        console.log(data)
        socket.current.emit('yeuCauXacThucDongBoBlackList')
      })

      socket.current.on('xacThucDongBoBlackListLoi' , data => {
        console.log(data)
      })

      socket.current.on('xacThucThanhCong' , data => {
        console.log(data)
      })

      socket.current.on('capNhatBlackListLoi' , data => {
        console.log(data)
        console.log('Cập nhật blacklist lỗi')
      })

      socket.current.on('capNhatBlackListThanhCong' , data => {
        console.log(data)
        console.log('Cập nhật blacklist thành công')
      })

      socket.current.on('yeuCauCapNhatBlackList' , data => {
        console.log(data)
        console.log('Yêu cầu cập nhật blackList')
        socket.current.emit('capNhatBlackListThanhCong')
      })

      console.log("creating event");
    }
  }, [token]);
  return (
    <div className="App">
      <div>
        <input
          onChange={(e) => {
            console.log(e.target.value);
            setInputToken(e.target.value);
          }}
        />
        <button
          onClick={() => {
            setToken(inputToken);
          }}
        >
          {" "}
          Set token{" "}
        </button>
      </div>
      <div>
        <input
          placeholder="Nhập vào url"
          onChange={(e) => {
            setInputUrl(e.target.value);
          }}
        />
        <button
          onClick={() => {
            setUrl(inputUrl);
            console.log(inputUrl);
            socket.current.emit("taoThongTinTruyCap", {
              url: inputUrl,
              tinhTrang: "DaChan",
            });
          }}
        >
          Truy Cập
        </button>
        <br />
        <button
          onClick={() => {
            if (maDongBoLichSuHienTai) {
              console.log("Ma dong bo : " + maDongBoLichSuHienTai.toString());
            }
            if (!maDongBoLichSuHienTai) {
              socket.current.emit("dongBoLichSuTruyCap");
            } else {
              socket.current.emit("dongBoLichSuTruyCap", {
                maThongTinDongBoLichSu: maDongBoLichSuHienTai,
              });
            }
          }}
        >
          {" "}
          Đồng bộ lịch sử truy cập{" "}
        </button>

        <button
          onClick={() => {
            if (maDongBoBlackListHienTai) {
              console.log("Ma dong bo : " + maDongBoBlackListHienTai.toString());
            }
            if (!maDongBoBlackListHienTai) {
              socket.current.emit("dongBoBlackList");
            } else {
              socket.current.emit("dongBoBlackList", {
                maDongBoBlackList: maDongBoBlackListHienTai,
              });
            }
          }}
        >
          {" "}
          Đồng bộ BlackList{" "}
        </button>


        <button
          onClick={() => {
            if (maDongBoBlackListHienTai) {
              console.log("Ma dong bo : " + maDongBoBlackListHienTai.toString());
            }
            if (!maDongBoBlackListHienTai) {
              socket.current.emit("capNhatBlackList" , {
                loaiCapNhat : "Them",
                tenDanhSach : 'BlackListTest1'
              });
            }
          }}
        >
          {" "}
          Cập nhật blacklist{" "}
        </button>
      </div>
    </div>
  );
}

export default App;
