const fragment = document.createDocumentFragment()
function createDiv(i, j) {
    const div = document.createElement('div')

    div.classList.add('block')
    div.id = `row${i}-column${j}`

    fragment.append(div)
}

const gridSize = 50
for(let i=1; i<=gridSize; i++) {
    for(let j=1; j<=gridSize; j++) {
        createDiv(i, j);
    }
}

console.log('fragment size before appending to document -> #main',fragment.childElementCount)

main.append(fragment)

console.log('fragment size after appending to document -> #main',fragment.childElementCount)



const elements = {}

document.querySelectorAll('#info section > div > span').forEach( (span) => {
    const spanId = span.id
    elements[spanId] = span.children[0];
})

const addInfo = function(id, info) {
    elements[id].textContent = Math.round(info)
}

function currentTargetDescriptor(target) {
    let text = target.tagName.toLowerCase()

    if(target.id !== '') text += ` #${target.id}`
    if(target.classList.length !== 0) text += ' .' + [...target.classList].join(' .')

    return text
}

const targetBox = document.getElementById('target-box')
const currentTarget = document.querySelector('#mouseEvent > span')
const targetBoxStorageElement = document.querySelector('#target-box-geometry > span')

const updateGeometry = function() {
    addInfo('el-clientWidth', targetBox.clientWidth)
    addInfo('el-clientHeight', targetBox.clientHeight)

    addInfo('el-offsetWidth', targetBox.offsetWidth)
    addInfo('el-offsetHeight', targetBox.offsetHeight)

    addInfo('el-scrollWidth', targetBox.scrollWidth)
    addInfo('el-scrollHeight', targetBox.scrollHeight)

    addInfo('el-offsetLeft', targetBox.offsetLeft)
    addInfo('el-offsetTop', targetBox.offsetTop)

    addInfo('el-scrollLeft', targetBox.scrollLeft)
    addInfo('el-scrollTop', targetBox.scrollTop)

    // Viewport Geometry Infromation of target-box
    const rect = targetBox.getBoundingClientRect()
    addInfo('el-top', rect.top)
    addInfo('el-left', rect.left)
    addInfo('el-bottom', rect.bottom)
    addInfo('el-right', rect.right)

    // Window Geometry Infromation
    addInfo('w-innerHeight', window.innerHeight)
    addInfo('w-innerWidth', window.innerWidth)
    addInfo('w-scrollX', window.scrollX)
    addInfo('w-scrollY', window.scrollY)

    targetBoxStorageElement.textContent = `Target Box:  ${currentTargetDescriptor(targetBox)}`
}

//resize event is only for window object and not any other DOM node
//resize and scroll events are not have bubble phase but they have capture phase
window.addEventListener('resize', updateGeometry)
window.addEventListener('scroll', updateGeometry)
targetBox.addEventListener('scroll', updateGeometry)

updateGeometry()

document.addEventListener('mousemove', (e) => {
    addInfo('e-clientX', e.clientX)
    addInfo('e-clientY', e.clientY)

    addInfo('e-offsetX', e.offsetX)
    addInfo('e-offsetY', e.offsetY)

    addInfo('e-pageX', e.pageX)
    addInfo('e-pageY', e.pageY)

    addInfo('e-screenX', e.screenX)
    addInfo('e-screenY', e.screenY)

    currentTarget.textContent = `Current Element:  ${currentTargetDescriptor(e.target)}`
})

