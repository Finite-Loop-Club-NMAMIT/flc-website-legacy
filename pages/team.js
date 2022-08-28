import React from 'react'
const handler = (e) => {
    fetch('/api/test', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: "Test Lol",
            description: "Test Description",
            members: [{ id: "" }, { id: "" }]
        })
    }).then(res => console.log(res.json())).catch(err => console.log(err))
}
function team() {

    return (
        <div>
            <button onClick={handler}>
                Send
            </button>

        </div>
    )
}

export default team