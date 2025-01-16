const appState = []
let appStateCursor = 0

const React ={
    createElement: (tag, props, ...children) => {
        if (typeof tag === "function"){
            return tag(props, ...children)
        }

        const el = {
            tag, 
            props,
            children
        }

        return el
    },

}
const useState = (initialState) => {
    const stateCursor = appStateCursor
    appState[stateCursor] = appState[stateCursor] || initialState
    
    const setState = (newState) => {        
        appState[stateCursor] = newState
        reRender()
    }

    appStateCursor++
    
    return [appState[stateCursor], setState]
}

const render = (el, container) => {    
    let domEl;
    if (typeof el === "string" || typeof el === 'number'){
        domEl = document.createTextNode(String(el))
        container.appendChild(domEl)
        return
    }

    domEl = document.createElement(el.tag)

    let elProps = el.props ? Object.keys(el.props) : null;
    if (elProps && elProps.length > 0) {
        elProps.forEach(prop => (domEl[prop] = el.props[prop]))
    }

    if (el.children && el.children.length > 0){
        el.children.forEach(node => render(node, domEl))
    }
    
    container.appendChild(domEl)
}

const reRender = () => {
    const rootNode = document.getElementById("root")
    rootNode.innerHTML = ""
    appStateCursor = 0    
    // render(<App />, document.getElementById("root"))
    // render(<Root />, document.getElementById("root"))
}

module.exports = {React, render, useState}