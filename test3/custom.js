
//get services using api
checkedFunction = function () {
  var grid = document.querySelector('input[name="grid"]:checked').value;
  document.getElementById("image-list").classList = ''
  document.getElementById("image-list").classList.add(grid)
}

getAjax = function (url, success) {
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  xhr.open('GET', url);
  xhr.onreadystatechange = function () {
    if (xhr.readyState > 3 && xhr.status == 200) {
      document.getElementById("loader").classList.remove("active")
      success(xhr.responseText);
    }
  };
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.send();
  document.getElementById("loader").classList.add("active")
  return xhr;
}
window.onscroll = function () {
  var d = document.documentElement;
  var offset = d.scrollTop + window.innerHeight;
  var height = d.offsetHeight;
  var item = parseInt(document.querySelector("li:last-child").getAttribute('index')) + 10;
  if (offset >= height) {
    getFilter(item);
  }
};


getFilter = function (item) {
  var currentSearchVal = document.getElementById("myInput").value;
  var innerList = "";
  var item = item || 10;
  var printImageList = [];
  if (navigator.onLine) {
    getAjax("https://5b5cb0546a725000148a67ab.mockapi.io/api/v1/users?page=2&limit=" + item, function (data) {
      var list = JSON.parse(data),
        filterItems = list;

      printImageList = getFilterFromImageList(filterItems, currentSearchVal);
      localStorage.setItem("listItem", JSON.stringify(printImageList))
      if (printImageList.length) {
        for (var i = 0; i < printImageList.length; i++) {
          innerList += "<li filterValue='" + printImageList[i].name + "' index='" + i + "'><img src=" + printImageList[i].avatar + "></li>";
        }
      }
      document.getElementById("image-list").innerHTML = innerList;
    })
  }
  else {
    printImageList = getFilterFromImageList(JSON.parse(localStorage.getItem("listItem")), currentSearchVal);
    localStorage.setItem("listItem", JSON.stringify(printImageList))
    if (printImageList.length) {
      for (var i = 0; i < printImageList.length; i++) {
        innerList += "<li filterValue='" + printImageList[i].name + "' index='" + i + "'><img src=" + printImageList[i].avatar + "></li>";
      }
    }
    document.getElementById("image-list").innerHTML = innerList;
  }

}

getFilterFromImageList = function (listToSearch, termToSearch) {
  var filteredList = listToSearch;
  filteredList = filteredList.filter(function (currentItem) {
    if (currentItem.name && currentItem.name.search(new RegExp(termToSearch, "i")) != -1) {
      return true;
    }
  });
  return filteredList;
};