const express = require('express')
const os = require('os')

const app = express()
const port = 5050

app.get('/api/arch', (req, res) => {
    res.send(`CPU architecture: ${os.arch()}`)
})

app.get('/api/cpus', (req, res) => {
    const cpu = os.cpus()
    let result = ''

    cpu.map(value => {
        result += `CPU: ${value.model}. Speed: ${value.speed}<br />`
    })

    res.send(`<p>${result}</p>`)
})

app.get('/api/ram', (req, res) => {
    res.send(`RAM: ${os.freemem()} / ${os.totalmem()}`)
})

app.get('/api/diskspace', (req, res) => {
    res.send(`URL in development`)
})

app.get('/api/hostname', (req, res) => {
    res.send(`Host name: ${os.hostname()}`)
})

app.get('/api/ipaddress', (req, res) => {
    const networks = os.networkInterfaces();

    for (network in networks) {
        networks[network].map(value => {
            if (!value.internal && value.family === 'IPv4') res.send(`IP address: ${value.address}`)
        })
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})