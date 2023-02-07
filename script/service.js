export function CalculatePrice(e, config) {
    let s, t;
    if (e.name == "bunny") {
        s = (config.drive[0] * e.price.storage[0] + config.drive[1] * e.price.storage[1]) * config.storage;
        t = config.transfer * e.price.transfer;
    } else if (e.name == "scaleway") {
        s = (config.multi_storage[0] * e.price.storage[0] + config.multi_storage[1] * e.price.storage[1]) * (config.storage > 75) * (config.storage - 75);
        t = e.price.transfer * (config.transfer > 75) * (config.transfer - 75);
    } else {
        s = config.storage * e.price.storage;
        t = config.transfer * e.price.transfer;
    }
    let p = s + t;
    if (p > e.sum.max && e.sum.max != 0) {
        p = e.sum.max
    }
    if (p < e.sum.min && e.sum.min != 0) {
        p = e.sum.min
    }
    return p;
}

export function GetActualConfig() {
    let storage = document.getElementById("storage").value
    let transfer = document.getElementById("transfer").value
    let hdd_ssd = Array.from(document.getElementsByName('storage-type')).map(e => e.checked)
    let multi_single = Array.from(document.getElementsByName('multi')).map(e => e.checked)
    return {
        storage: storage,
        transfer: transfer,
        drive: hdd_ssd,
        multi_storage: multi_single
    }
}