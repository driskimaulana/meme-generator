import React, {useState, useEffect} from 'react';

export default function Form() {

	const [meme, setMeme] = useState({
		topText: "",
		bottomText: "",
		randomImage: "http://i.imgflip.com/1bij.jpg" 
	})

	const [allMemeImages, setAllMemeImage] = useState([])

	/**
    useEffect takes a function as its parameter. If that function
    returns something, it needs to be a cleanup function. Otherwise,
    it should return nothing. If we make it an async function, it
    automatically retuns a promise instead of a function or nothing.
    Therefore, if you want to use async operations inside of useEffect,
    you need to define the function separately inside of the callback
    function, as seen below:
    */

	useEffect(() => {

		async function getMemes() {
			const res = await fetch("https://api.imgflip.com/get_memes")
			const data = await res.json()
			setAllMemeImage(data.data.memes)
		}

		getMemes()
    }, [])

	function getRandomImage() {
		// console.log(allMemeImages)
		// setMeme(memesData.data.memes[Math.floor(Math.random() * memesData.data.memes.length)].url)
		// best practice
		// setMeme(prevMeme => memesData.data.memes[Math.floor(Math.random() * memesData.data.memes.length)].url)
		const randomNumber = Math.floor(Math.random() * allMemeImages.length)
		setMeme((prevMeme) => {
			// prevMeme = memesData.data.memes[randomNumber].url
			// return prevMeme

			return {
				...prevMeme,
				randomImage: allMemeImages[randomNumber].url
			}
		})
	}	

	function handleChange(event) {
		const {name, value} = event.target

		setMeme(prevMeme => {
			return {
				...prevMeme,
				[name] : value
			}
		})
	}

	return(
		<main>
			<div className='form'>
				<input onChange={handleChange} type="text" name="topText" className='form--input' placeholder="Top Text"/>
				<input onChange={handleChange} type="text" name="bottomText" className='form--input' placeholder="Bottom Text"/>
				<button className="form--submit" onClick={getRandomImage}>Get a new meme image</button>
			</div>
			<div className="meme">
                <img alt="meme" src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top" >{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
		</main>
	)
}
