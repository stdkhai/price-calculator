import { data } from "./data.js"
import { CalculatePrice, GetActualConfig } from "./service.js"

export function RenderCounter(e) {
    $(`#${e.id}-count`).html(e.value)
}

export function RenderRows() {
    const cfg = GetActualConfig();
    let priceSet = [];
    let max = { v: -1, k: "" }
    let min = { v: 10000000, k: "" }
    for (const e of data) {
        $(`.row.${e.name}`).map(el => {
            let price = CalculatePrice(e, cfg);
            priceSet[e.name] = price;
        });
    }
    for (const key in priceSet) {
        if (priceSet[key] >= max.v) {
            max = {
                v: priceSet[key],
                k: key
            };
        }
        if (priceSet[key] <= min.v) {
            min = {
                v: priceSet[key],
                k: key
            };
        }
    }

    for (const key in priceSet) {
        let h = priceSet[key] / max.v * 100;
        $(`.row.${key}`).addClass('inactive');
        $(`.row.${key}`).css('height', h + '%');
        $(`.row.${key}`).html(`<div class="amount">${priceSet[key].toFixed(1)}$</div>`)
        $(`.row.${min.k}`).removeClass('inactive');
    }

}
