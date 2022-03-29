let fs = require("fs-extra")
let mdatas = new Map();
let db = {
    get(name, child, fvalue, set) {
        if(ma.isnVar(name)) name = "default";
        if(ma.isnVar(child)) child = "default";
        if(ma.isnVar(fvalue)) fvalue = 0; 
        if(ma.isnVar(set)) set = false;
        if(!mdatas.has(`${child}·${name}`) && set == true) mdatas.set(`${child}·${name}`, fvalue);
        return mdatas.has(`${child}·${name}`) ? mdatas.get(`${child}·${name}`) : fvalue;
    },
    set(name, val, child, set) {
        if(ma.isnVar(name)) name = "default";
        if(ma.isnVar(val)) val = 0;
        if(ma.isnVar(child)) child = "default";
        if(ma.isnVar(set)) set = true;

        if(!mdatas.has(`${child}·${name}`) || set == true) mdatas.set(`${child}·${name}`, val);
        return;
    },
    has(name, child) {
        if(ma.isnVar(name)) name = "default";
        if(ma.isnVar(child)) child = "default";
        return mdatas.has(`${child}·${name}`)
    },
    includes(name, val, child) {
        if(ma.isnVar(name)) name = "default";
        if(ma.isnVar(val)) val = 0;
        if(ma.isnVar(child)) child = "default";
       
        return (mdatas.has(`${child}·${name}`) && Array.isArray(mdatas.get(`${child}·${name}`) && mdatas.get(`${child}·${name}`).includes(val))) ? true : false;
    },
    add(name, val, child, oval, type) {
        if(ma.isnVar(name)) name = "default";
        if(ma.isnVar(val)) val = 0;
        if(ma.isnVar(oval)) oval = "default";
        if(ma.isnVar(child)) child = "default";
        if(ma.isnVar(type)) type = ma.getType(val);

        switch(ma.getType(mdatas.get(`${child}·${name}`))) {
            case "number": {mdatas.set(`${child}·${name}`, mdatas.get(`${child}·${name}`)+Number(val)); break};
            case "string": {mdatas.set(`${child}·${name}`, mdatas.get(`${child}·${name}`)+String(val)); break};
            case "array": {
                let av = mdatas.get(`${child}·${name}`);
                av.push(val);
                mdatas.set(`${child}·${name}`, av);
                break;
            }
            case "object": {
                let av = mdatas.get(`${child}·${name}`);
                av[oval] = val; 
                mdatas.set(`${child}·${name}`, av)
                break;
            }
            default: {mdatas.set(`${child}·${name}`, val)}
        }
    },

    remove(name, val, child, oval, type) {
        if(ma.isnVar(name)) name = "default";
        if(ma.isnVar(val)) val = 0;
        if(ma.isnVar(child)) child = "default";
        if(ma.isnVar(oval)) oval = "default";
        if(ma.isnVar(type)) type = ma.getType(val);

        switch(ma.getType(mdatas.get(`${child}·${name}`))) {
            case "number": {mdatas.set(`${child}·${name}`, mdatas.get(`${child}·${name}`)-val); break}
            case "string": {mdatas.set(`${child}·${name}`, mdatas.get(`${child}·${name}`).replace(val, "")); break}
            case "array": {
                let av = mdatas.get(`${child}·${name}`);
                if(!av.includes(val)) return;
                av.splice(av.indexOf(val), 1);
                mdatas.set(`${child}·${name}`, av);
                break;
            }
            case "object": { 
                let av = mdatas.get(`${child}·${name}`);
                if(!av[oval]) return;
                delete av[oval];
                mdatas.set(`${child}·${name}`, av);}
            default: {return}
        }
    },
    
    init() {
        if(!fs.pathExistsSync(`./db`)) return fs.mkdirSync('./db')
        fs.readdirSync('./db').forEach(f => {
            if(f) {
            fs.readdirSync(`./db/${f}`).forEach(j => {
                if(j) {
                    let d = fs.readJSONSync(`./db/${f}/${j}`)
                    if(d) {
                        d.forEach(e => {
                            mdatas.set(`${f}·${e.name}`, e.value)
                        })
                    }
                }
            })}
        })
    },
    save(exit) {
        if(ma.isnVar(exit)) exit = false
        let a = [], b = {}, y = 0;

        mdatas.forEach(function(value, key, map) {
            let s = key.split("·", 2);
            let c = s[0];
            if(ma.isnVar(b[c])) b[c] = 0;
            if(ma.isnVar(a[b[c]])) a[b[c]] = []
            if(a[b[c]].length >= 100 || (a[b[c]][0] && a[b[c]][0].child != c)) b[c] = a.length
            if(ma.isnVar(b[c])) b[c] = 0;
            if(ma.isnVar(a[b[c]])) a[b[c]] = []
            a[b[c]].push({name: s[1], value: value, child: s[0]})
        });
        fs.removeSync(`./db`);
        fs.mkdirSync(`./db`);
        let s = setInterval(() => {
            if(ma.isnVar(a[y])) {
                if(exit == true) return process.exit(); 
                return clearInterval(s);
            }
            if(!fs.pathExistsSync(`./db/${a[y][0].child}`)) fs.mkdirSync(`./db/${a[y][0].child}`)
            if(!fs.existsSync(`./db/${a[y][0].child}/${a[y][0].name}.json`)) fs.createFileSync(`./db/${a[y][0].child}/${a[y][0].name}.json`)
            fs.writeJSONSync(`./db/${a[y][0].child}/${a[y][0].name}.json`, a[y], {spaces: 2})
            y++
        }, 250)
    },
}

let ma = {
    isnVar(val) {
        return (typeof val === "undefined") ? true: false;
    },
    getType(val) {
        return (Array.isArray(val)) ? "array" : typeof val;
    },
}

module.exports = db;