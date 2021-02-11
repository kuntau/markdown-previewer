import './App.css';
import m from 'marked'
import hljs from 'highlight.js'
// import 'highlight.js/styles/gruvbox-light.css'
// import 'highlight.js/styles/gruvbox-dark.css'
import { useState, useEffect, useContext, createContext } from 'react'

m.setOptions({
  renderer: new m.Renderer(),
  highlight: function(code, language) {
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
    return hljs.highlight(validLanguage, code).value;
  },
  breaks: true,
});

const themes = {
  dark:  () => require('highlight.js/styles/gruvbox-dark.css'),
  light: () => require('highlight.js/styles/gruvbox-light.css')
}
const ThemeContext = createContext(themes.dark)

const App = () => {
  const [ marked, setMarked ] = useState("")
  const [ rawMark, setRawMark ] = useState(placeholder)
  const [ darkMode, setDarkMode ] = useState(true)

  useEffect(() => {
    const converted = m(rawMark)
    const preview = document.getElementById("preview")
    setMarked(converted)
  }, [rawMark])

  useEffect(() => {
    // const test = `highlight.js/styles/gruvbox-${darkMode ? 'dark' : 'light'}.css`
    // const test = 'highlight.js/styles/gruvbox-light.css'
    // const test = `/atom-one-${darkMode ? 'dark' : 'light'}.css`
    // require(`highlight.js/styles/gruvbox-${darkMode ? 'dark' : 'light'}.css`)
    // gequire('highlight.js/styles/atom-one-dark.css')
    darkMode ? require('highlight.js/styles/default.css') : require('highlight.js/styles/atom-one-dark.css')
    // require(test)
    const root = document.getElementById('root')

    root.style.setProperty('--bg-color', darkMode ? '#282c34' : '#fbfbfb')
    root.style.setProperty('--editor-bg-color', darkMode ? '#1e2127' : '#f0f0f0')
    root.style.setProperty('--text-color', darkMode ? '#f0f0f0' : '#272c34')
    // console.log(test);
  }, [darkMode])

  return (
    <div className="flex flex-row w-screen h-screen px-5 pb-5 App">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="w-1/2 mr-2 shadow-lg editor">
        <Editor rawMark={rawMark} setRawMark={setRawMark}/>
      </div>
      <div className="w-1/2 ml-2 shadow-lg preview">
        <Preview marked={{ __html: marked }} />
      </div>
    </div>
  );
}

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav id="nav" className="absolute top-0 left-0 flex items-center justify-around w-screen h-10 px-5 shadow-md">
      <h1 className="flex-grow text-xl">Markdown Previewer</h1>
      <label htmlFor="darkMode">
        Dark Mode
        <input
          className="ml-2"
          type="checkbox"
          checked={darkMode}
          onChange={ ()=>{ setDarkMode(!darkMode) } }
        />
      </label>
    </nav>
  )
}

const Editor = ({ rawMark, setRawMark }) => {
  return (
    <textarea
      id="editor"
      className="w-full h-full p-5 font-mono"
      name="editor"
      value={rawMark}
      onChange={(e) => {setRawMark(e.target.value)}}
    >
    </textarea>
  )
}

const Preview = ({ marked }) => {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <div
        id="preview"
        className="w-full h-full p-5 overflow-y-scroll"
        dangerouslySetInnerHTML={marked}
      >
    </div>
    </ThemeContext.Provider>
  )
}

const placeholder =
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`javascript
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
    - With different indentation levels.
        - That look like this.
        - And like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png)`;

export default App;
