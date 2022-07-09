import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  // Status:
  const [status, setStatus] = useState(0);
  /* 
  0 => fetching
  1 => success
  2 => bakım
  3 => error */
  // Link:
  const [link, setLink] = useState(300);

  const getStoredLink = () => {
    if (localStorage) {
      let storedLink = localStorage.getItem("link");
      let parsed = parseInt(storedLink);
      if (parsed)
        setLink(storedLink);
        setTimeout
    }
  }

  const findLink = async () => {
    setTimeout(() => {
      console.log("aranıyor: ", link)
    }, 500)
    await axios.get(`/api/${link}`)
    .then((response) => {
      let result = response.data;
      setStatus(result.status)
      if (!result.success) {
        setLink(parseInt(link)+1);
      } else {
        localStorage.setItem("link", result.link);
        setTimeout(() => {
          // window.location.href = `http://dizipal${result.link}.com`;
        }, 1500);
      }
    })
  }

  useEffect(() => {
    getStoredLink();

    return () => {}
  }, [])

  useEffect(() => {
    findLink();

    return () => {}
  }, [link]);

  return (
    <>
      <div className="App" style={{ textAlign: "center", marginTop: "50px" }}>
        <header className="App-header">
          <h1 className="display-3">Dizipal Otomatik Link</h1>
          <h4 className="fs-1">Lütfen güncel linke yönlendirilene kadar bekleyiniz.</h4>
        </header>
        <section className="App-section" style={{ marginTop: "100px" }}>
          {status === 0 && <><h2>Link bulunuyor...</h2><i className="fa-solid fa-cog fa-spin fa-9x"></i></>}
          {status === 1 && <><h2>Link bulundu: {link}. Yönlendiriliyor...</h2><i className="fa-solid fa-check-circle fa-9x"></i></>}
          {status === 2 && <><h2>Görünüşe göre site bakımda. Lütfen daha sonra tekrar deneyiniz.</h2><i className="fa-solid fa-person-digging fa-9x"></i></>}
          {status === 3 && <><h2>Link bulunamadı. Lütfen daha sonra tekrar deneyiniz.</h2><i className="fa-solid fa-triangle-exclamation fa-9x"></i></>}
        </section>
        <footer className="App-footer" style={{ marginTop: "100px" }}>
          <p>Bahsi geçen site ve yöneticileri ile hiçbir bağlantısı yoktur.<br />
            Sadece internette herkese açık linki bulur ve yönlendirir.<br />
            Çalışma garantisi yoktur.</p>
        </footer>
      </div>
    </>
  );
}
