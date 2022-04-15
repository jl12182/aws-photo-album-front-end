var name = '';
var encoded = null;
var fileExt = null;
var SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();
const icon = document.querySelector('i.fa.fa-microphone');



///// SEARCH TRIGGER //////
function searchFromVoice() {
  recognition.start();
  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    console.log(speechToText);
    document.getElementById('searchbar').value = speechToText;
    search();
  }
}

function search() {
  var searchTerm = document.getElementById('searchbar').value;
  var apigClient = apigClientFactory.newClient({ apiKey: '3v7s3vevjI3i3ARBRI8fyaDxOGTtAEw1svh5Vjfe' });


    var body = { };
    var params = {q : searchTerm};
    var additionalParams = {headers: {
    'Content-Type':'application/json'
    }};

    apigClient.searchGet(params, body , additionalParams).then(function(res){
        console.log('success');
        console.log(res);
        showImages(res.data)
      }).catch(function(result){
          console.log(result);
          console.log('NO RESULT');
      });


}


/////// SHOW IMAGES BY SEARCH //////

function showImages(res) {
  var newDiv = document.getElementById('images');
  if(typeof(newDiv) != 'undefined' && newDiv != null){
  while (newDiv.firstChild) {
    newDiv.removeChild(newDiv.firstChild);
  }
  }

  console.log(res.imagePaths);
  if (res.length == 0) {
    var newContent = document.createTextNode('No image to display');
    newDiv.appendChild(newContent);
  }
  else {
    results=res.imagePaths
    for (var i = 0; i < results.length; i++) {
      console.log(results[i]);
      var newDiv = document.getElementById('images');
      //newDiv.style.display = 'inline'
      var newimg = document.createElement('img');
      var classname = randomChoice(['big', 'vertical', 'horizontal', '']);
      if(classname){newimg.classList.add();}

      filename = results[i].substring(results[i].lastIndexOf('/')+1)
      newimg.src = 'https://csgyb2.s3.us-west-2.amazonaws.com/'+filename;
      newDiv.appendChild(newimg);
    }
  }
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}



///// UPLOAD IMAGES ///////

const realFileBtn = document.getElementById('realfile');

function uploadImage() {
  realFileBtn.click();
}

function previewFile(input) {
  var reader = new FileReader();
  var label = document.getElementById('labelbox').value;
  var label = String(label)
  name = input.files[0].name;
  fileExt = name.split('.').pop();
  console.log(input.files[0])
  axios.put('https://x0k8b4j0ii.execute-api.us-west-2.amazonaws.com/dev/upload/csgyb2/'+name,
  input.files[0],
  {
    'headers':{
      'Content-Type': 'image/jpeg',
      'x-api-key': '3v7s3vevjI3i3ARBRI8fyaDxOGTtAEw1svh5Vjfe',
      'x-amz-meta-customLabels' : label
    }
  }
  ).then(res=>console.log(res)).catch(e=>console.log(e))
}
