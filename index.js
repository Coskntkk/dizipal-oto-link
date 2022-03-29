let link = localStorage.getItem("link")
  ? parseInt(localStorage.getItem("link"))
  : 205;
const proxyurl = "https://api.allorigins.win/get?charset=ISO-8859-1&url=";

while (link) {
  setInterval(() => {
    $.ajax({
      url: proxyurl + `https://dizipal${link}.com/`,
      success: function (data) {
        console.log(data);
        const ind = data.contents.indexOf("dizipal");
        if (ind > -1) {
          $("#message").html(`Link Bulundu: ${siteLink}. Yönlendiriliyor...`);
          localStorage.setItem("link", link);
          setTimeout(function () {
            window.location.href = `https://dizipal${link}.com/`;
          }, 2000);
        } else {
          link++;
        }
      },
      error: function (data) {
        link++;
      },
    });
  }, 1000);
}
