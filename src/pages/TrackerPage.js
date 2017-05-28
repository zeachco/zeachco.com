import './TrackerPage.scss';
import React, {Component, PropTypes} from 'react'
// import { connect } from 'react-redux'

import Translate from '../components/Translate'
import GoogleMapReact from 'google-map-react';
import Base from './Base'

const Marker = ({size}) => (
    <svg className="circle" height={size * 2} width={size * 2} style={{
        transform: `translate(-${size }px, -${size}px)`
    }}>
        <circle
            cx={size}
            cy={size}
            r={size - 5}
            fill="red"
            stroke="black"
        />
    </svg>
);

Marker.propTypes = {
    size: PropTypes.number.isRequired
}

class TrackerPage extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            coords: {
                lat: 45.5,
                lng: -73.5
            },
            accuracy: 1
        };
    }

    componentDidMount() {
        // TODO make component
        if (window.navigator.geolocation) {
            setTimeout(() => {
                window.navigator.geolocation.getCurrentPosition(position => {
                    this.setState({
                        accuracy: position.coords.accuracy,
                        coords: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    });
                });
            });
        }

        const root = this.timesheet;
		const headline = document.getElementById('headline');
		const downline = document.getElementById('downline');
		const now = new Date();

		class appState {
			reset() {
				this.now = new Date();
				this.hours = [0, 0, 0, 0, 0];
				this.infos = ['', '', '', '', ''];
				this.setDirty();
			}

			setDirty() {
				clearTimeout(this.to);
				this.to = setTimeout(this.render.bind(this), 10);
			}

			generateDOM() {
				this.table = document.createElement('table');
				this.headline = document.createElement('h3');
				this.downline = document.createElement('p');
				this.elReset = document.createElement('button');
				this.elReset.innerHTML = 'reset';
				this.elReset.onclick = () => {
					this.reset();
					this.save();
				}
				root.appendChild(this.headline);
				root.appendChild(this.table);
				root.appendChild(this.downline);
				root.appendChild(this.elReset);
				[0, 1, 2, 3, 4].forEach(dayNb => {
					const tr = document.createElement('tr');
					const date = document.createElement('td');
					const time = document.createElement('td');
					const info = document.createElement('td');
					time.contentEditable = true;
					info.contentEditable = true;
					time.onblur = () => {
						this.hours[dayNb] = numberize(time.innerHTML);
						this.save();
						this.setDirty();
					};
					time.onfocus = function () {
						selectElementContents(this);
					}.bind(time);
					info.onblur = () => {
						this.infos[dayNb] = info.innerHTML;
						this.save();
					};
					tr.appendChild(date);
					tr.appendChild(time);
					tr.appendChild(info);
					this.table.appendChild(tr);
				});
			}

			getWeekDate(index) {
				return new Date(this.now.setDate(this.now.getDate() - this.now.getDay() + index));
			}

			save() {
				const {
					now,
					hours,
					infos
				} = this;
				const data = JSON.stringify({
					now,
					hours,
					infos
				});
				localStorage.setItem('data', data);
			}

			load() {
				try {
					this.reset();
					const {
						now,
						hours,
						infos
					} = JSON.parse(localStorage.getItem('data'));
					Object.assign(this, {
						now: new Date(now),
						hours,
						infos
					});
					this.setDirty();
				} catch (e) {
					console.warn('cannot load', e);
					this.reset();
				}
			}

			render() {
				const trs = this.table.querySelectorAll('tr');
				let total = 0;
				for (let i = 0; i < trs.length; i++) {
					const tds = trs[i].querySelectorAll('td');
					tds[0].innerHTML = getWeekDay(this.getWeekDate.call(this, i + 1));
					tds[1].innerHTML = this.hours[i] + 'h';
					tds[2].innerHTML = this.infos[i];
					total += this.hours[i];
				}

				const range = `${getWeekDay(this.getWeekDate(1))} to ${getWeekDay(this.getWeekDate(6))}`;
				this.headline.innerHTML = `Timesheet: ${total} hours from ${range}`;
				this.downline.innerHTML = `Worked a total of ${total} hours.`
			}
		}

		const state = new appState();
		state.generateDOM();
		state.load();


		function numberize(val) {
			return +val.replace(/[^0-9\.]/g, '');
		}

		function renderTitle() {
			const total = getTimeTotal();
			const range = `${getWeekDay(getWeekDate(1))} to ${getWeekDay(getWeekDate(6))}`;
			headline.innerHTML = `Timesheet: ${total} hours from ${range}`;
			downline.innerHTML = `Worked a total of ${total} hours.`
			save();
		}

		function getTimeTotal() {
			let total = 0;
			const els = document.querySelectorAll('.js-hours');
			for (let n in els) {
				const val = els[n].innerHTML || '0';
				total += numberize(val);
			}
			return total;
		}

		function getWeekDate(index) {
			return new Date(now.setDate(now.getDate() - now.getDay() + index));
		}

		function getWeekDay(date) {
			return date.toDateString().replace(/ 20[0-9]{2}/, '');
		}

		function selectElementContents(el) {
			const range = document.createRange();
			range.selectNodeContents(el);
			const sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);
		}
    }
    
    render () {
        const {
            coords = {lat: 0, lng: 0},
            accuracy = 1
        } = this.state;
        return (
            <Base>
                <h2>
                    <Translate content="tracker" />
                </h2>
                <div className="timesheet" ref={el => this.timesheet = el} />
                <hr/>
                <div style={{ height: 330 }}>
                    <GoogleMapReact center={coords} zoom={16}>
                        <Marker
                            lat={coords.lat}
                            lng={coords.lng}
                            size={10}
                        />
                    </GoogleMapReact>
                </div>
                {coords.lat}, {coords.lng} ({accuracy} precision)
            </Base>
        );
    }
}

TrackerPage.propTypes = {
};

export default TrackerPage;

