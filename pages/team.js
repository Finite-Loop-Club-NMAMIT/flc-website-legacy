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
            members: [{ id: "cl7c13ne50008wqd27nj37yuu" }, { id: "cl7cvyocm0012yyd2eh71fxb2" }]
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