const defaultData = {
    imgSrc: "M.Rafa.H.jpg",
    name: "Mochammad Rafa Hadrian",
    title: "Digital Marketing & Growth Strategist",
    desc: "Not just selling, but building connections and strategies so every content turns into profit.",
    age: "18",
    goal: "Billionaire young",
    wa: "085218973976",
    waLink: "https://wa.me/+6285218973976",
    loc: "Menteng Tenggulun, Jakarta Pusat",
    mapLink: "https://maps.app.goo.gl/Aemv565ATi9q5zru6",
    ig: "@dreanesvn",
    igLink: "https://instagram.com/dreanesvn"
};
let uploadedImgBase64 = null;

function loadProfile() {
    const data = JSON.parse(localStorage.getItem('rafa_profile')) || defaultData;
    document.getElementById('disp-img').src = data.imgSrc || "Rafa.jpeg";
    document.getElementById('disp-name').innerText = data.name;
    document.getElementById('disp-title').innerText = data.title;
    document.getElementById('disp-desc').innerText = data.desc;
    document.getElementById('disp-age').innerText = data.age;
    document.getElementById('disp-goal').innerText = data.goal;
    document.getElementById('disp-wa').innerText = data.wa;
    document.getElementById('disp-wa-link').href = data.waLink;
    document.getElementById('disp-loc').innerText = data.loc;
    document.getElementById('disp-map-link').href = data.mapLink;
    document.getElementById('disp-ig').innerText = data.ig;
    document.getElementById('disp-ig-link').href = data.igLink;
}

function openModal() {
    const data = JSON.parse(localStorage.getItem('rafa_profile')) || defaultData;
    document.getElementById('inp-img-url').value = data.imgSrc.startsWith('data:') ? '' : data.imgSrc;
    document.getElementById('inp-name').value = data.name;
    document.getElementById('inp-title').value = data.title;
    document.getElementById('inp-desc').value = data.desc;
    document.getElementById('inp-age').value = data.age;
    document.getElementById('inp-goal').value = data.goal;
    document.getElementById('inp-wa').value = data.wa;
    document.getElementById('inp-map').value = data.mapLink;
    document.getElementById('inp-loc').value = data.loc;
    document.getElementById('inp-ig').value = data.ig;
    uploadedImgBase64 = null;
    document.getElementById('editModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedImgBase64 = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function saveProfile(e) {
    e.preventDefault();
    const currentData = JSON.parse(localStorage.getItem('rafa_profile')) || defaultData;
    let finalImg = currentData.imgSrc;
    const urlInput = document.getElementById('inp-img-url').value.trim();
    if (uploadedImgBase64) {
        finalImg = uploadedImgBase64;
    } else if (urlInput !== "") {
        finalImg = urlInput;
    }
    const newData = {
        imgSrc: finalImg,
        name: document.getElementById('inp-name').value,
        title: document.getElementById('inp-title').value,
        desc: document.getElementById('inp-desc').value,
        age: document.getElementById('inp-age').value,
        goal: document.getElementById('inp-goal').value,
        wa: document.getElementById('inp-wa').value,
        waLink: `https://wa.me/${document.getElementById('inp-wa').value.replace(/[^0-9]/g, '')}`,
        loc: document.getElementById('inp-loc').value,
        mapLink: document.getElementById('inp-map').value,
        ig: document.getElementById('inp-ig').value,
        igLink: `https://instagram.com/${document.getElementById('inp-ig').value.replace('@', '')}`
    };
    localStorage.setItem('rafa_profile', JSON.stringify(newData));
    loadProfile();
    closeModal();
}
window.onload = loadProfile;