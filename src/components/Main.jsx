import React from 'react'
export default function Main() {
    const [allMeme, setAllMeme] = React.useState([])
    const [meme,setMeme] = React.useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageURL:"http://i.imgflip.com/1bij.jpg"
    });
    function handleChange(event){
        const {value,name} = event.currentTarget;
        setMeme(prevMeme => (
            {...prevMeme, [name]: value})
        );
    }
    function getMemeImage(){
        const randomNumber = Math.floor(Math.random() * allMeme.length);
        const newMemeUrl = allMeme[randomNumber].url;
        setMeme(prevMeme=>({
            ...prevMeme,
            imageURL:newMemeUrl
        }));

    }
    React.useEffect(() => {
         fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMeme(data.data.memes))
    },[])


    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="Inset Top Text"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Insert Bottom Text"
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText}
                    />
                </label>
                <button onClick={getMemeImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageURL}/>
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}