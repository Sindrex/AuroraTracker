import React, { Component } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';

import './Home.css'

export class Home extends Component {
    static displayName = Home.name;
    state = {
        iterations: 20,
        rangeVal: 0,
        step: 60 //minutes
    }

    componentDidMount() {
        this.setState({ rangeVal: this.state.iterations - 1 })
    }

    render() {
        let now = new Date();
        var date = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

        let iterations = this.state.iterations;
        let marks = [];
        let urls = [];
        let prefix = "https://services.swpc.noaa.gov/images/animations/ovation/north/aurora_N_";
        let suffix = ".jpg";
        for (let i = 0; i < iterations; i++) {
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            if (month < 10) month = "0" + month;
            let day = date.getDate();
            if (day < 10) day = "0" + day;
            let hour = date.getHours();
            if (hour < 10) hour = "0" + hour;
            let minutes = date.getMinutes();
            if (minutes < 10) minutes = "0" + minutes;
            let fivers = Math.floor(minutes / 5);
            let flooredMinutes = 5 * fivers;
            if (flooredMinutes < 10) flooredMinutes = "0" + flooredMinutes;

            marks.push(year + "-" + month + "-" + day + "_" + hour + flooredMinutes);

            date.setMinutes(date.getMinutes() - this.state.step);

            urls.push(prefix + marks[i] + suffix);
        }
        marks.reverse();
        urls.reverse();
        console.log("Marks: ", marks);

        return (
            <div>
                <div id="imgslot">
                    <img src={urls[this.state.rangeVal]} alt="N/A"/>
                </div>
                <RangeSlider id="rangeslider"
                    value={this.state.rangeVal}
                    onChange={e => this.setState({ rangeVal: e.target.value })}
                    step={1} min={0} max={iterations - 1}
                    tooltipLabel={currentValue => `${marks[currentValue]}`}
                    tooltip='on'
                />
            </div>
        );
    }
}
