import {useState, useEffect} from 'react';
import axios from 'axios';
const proxyurl = "https://api.allorigins.win/get?charset=ISO-8859-1&url=";

function App() {
  const [message, setMessage] = useState('Link Bulunuyor...');
  const [link, setLink] = useState(localStorage.getItem('link') ? localStorage.getItem('link') : 200);

  useEffect(() => {
    if (link) {
      const config = {
        method: 'get',
        url: `${proxyurl}http://dizipal${link}.com`,
      };
      axios(config)
        .then(function (response) {
          const ind = response.data.contents.indexOf("<a href=\"https://dizipal");
          const siteLink = response.data.contents.substring(ind + 24, ind + 27);
          if (siteLink) {
            setMessage(`Link Bulundu: ${siteLink}. Yönlendiriliyor...`);
            localStorage.setItem('link', siteLink);
            setTimeout(() => {
              window.location.href = `https://dizipal${siteLink}.com/dizi/gibi`;
            }, 2000);
          } else {
            setLink(parseInt(link)+1);
          }
        })
        .catch(function (error) {
          setLink(parseInt(link)+1);
        });
    }
  }, [link]);

  return (
    <>
    <div className="App" style={{textAlign: "center", marginTop: "50px"}}>
      <header className="App-header">
        <h1 className="display-3">Dizipal Otomatik Link</h1>
        <h4 className="fs-1">Lütfen güncel linke yönlendirilene kadar bekleyiniz.</h4>
      </header>
      <section className="App-section" style={{marginTop: "50px"}}>
        <h2>{message}</h2>
        <i className="fa-solid fa-cog fa-spin fa-9x"></i>
      </section>
    </div>
    </>
  );
}

export default App;
