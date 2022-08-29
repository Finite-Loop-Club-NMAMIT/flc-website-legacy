import React from 'react'
const handler = (e) => {
    fetch('/api/test', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: "Test team1",
            description: "Test Description asdfas",
            members: [{ id: "cl7eagsi20006aed2qy24gndv" }, { id: "cl7eambbq0096aed2c0tvt3k4" }]
        })
    }).then(res => console.log(res.json())).catch(err => console.log(err))
}
const Taskhandler = (e) => {
    fetch('/api/create/task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: "Test Task 2",
            description: "Test Description",
            teamId: 17
        })
    }).then(res => { console.log(res.json()) }).catch(err => { console.log(err) })
}
function team() {
    return (
        <div>
            <button onClick={handler}>
                create Team
            </button>
            <button onClick={Taskhandler}>
                create Task
            </button>

        </div>
    )
}

export default team