const express = require('express')
const os = require('os')
const byteSize = require('byte-size')

const app = express()
const port = 5050

app.get('/', (req, res) => {
    res.send(`<h1>Choose an option</h1>
<ul>
<li><a href="/api/arch">CPU architecture</a></li>
<li><a href="/api/cpus">CPUs</a></li>
<li><a href="/api/ram">RAM</a></li>
<li><a href="/api/diskspace">Disk space</a></li>
<li><a href="/api/hostname">Host name</a></li>
<li><a href="/api/ipaddress">IP address</a></li>
</ul>`)
})

app.get('/api/arch', (req, res) => {
    res.send(`CPU architecture: ${os.arch()}`)
})

app.get('/api/cpus', (req, res) => {
    const cpu = os.cpus()
    let result

    cpu.map((value, index) => {
        if (index) result = `CPU: ${value.model}. Speed: ${value.speed}`
        else result += `<br />CPU: ${value.model}. Speed: ${value.speed}`
    })

    res.send(`<p>${result}</p>`)
})

app.get('/api/ram', (req, res) => {
    res.send(`RAM: ${byteSize(os.freemem())} / ${byteSize(os.totalmem())}`)
})

app.get('/api/diskspace', (req, res) => {
    const checkDiskSpace = require('check-disk-space').default

    checkDiskSpace(__dirname).then((diskSpace) => {
        res.send(`Disk space: ${byteSize(diskSpace.free)} / ${byteSize(diskSpace.size)}`)

        // {
        //     diskPath: 'C:',
        //     free: 99999999,
        //     size: 99999999
        // }
        // Note: `free` and `size` are in bytes
    })
})

app.get('/api/hostname', (req, res) => {
    res.send(`Host name: ${os.hostname()}`)
})

app.get('/api/ipaddress', (req, res) => {
    const networks = os.networkInterfaces()

    for (network in networks) {
        networks[network].map(value => {
            if (!value.internal && value.family === 'IPv4') res.send(`IP address: ${value.address}`)
        })
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})