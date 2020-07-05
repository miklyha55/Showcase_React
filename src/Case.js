import React from 'react';
import ReactDOM from 'react-dom';

export default class Case extends React.Component {

	render() {
		return (

			<div className='app_case d-flex flex-column align-items-between'>
				<div className="card-body px-0">
					<h5 className="card-title text-center">{ this.props.item.title }</h5>
					<div className="text-center">{ this.props.item.grade } класс</div>
					<div className="text-center">Предмет: <b>{ this.props.item.subject }</b></div>
				</div>
				{ !this.props.switcher ?
					<button className='btn btn-primary w-100 px-3'> { this.props.item.price } руб. </button>
				:
					<button className='btn btn-primary w-100 px-3'> { this.props.item.priceBonus } бон.</button>
				}
		    </div>

	    )
   	}
}