import'./less/index';
import React from 'react';
import ReactDOM from 'react-dom';
import Case from './Case';

export default class App extends React.Component {

	constructor(props) {

		super(props)

		this.state = {
			error: null,
  			load: true,
  			switcher: true,
  			items: [],
  			grade: '',
  			genre: '',
  			subject: '',
  			search: '',
  			genres: [],
  			subjects: [],
  			filter: []
		}

	}

	componentDidMount() {

		$.ajax({
			type: "POST",
			url: "http://krapipl.imumk.ru:8082/api/mobilev1/update",

			success: function(data) {
				this.setState({
					isLoaded: true,
					items: data.items,
					filter: data.items,
					genres: this.getUnicGenre(data.items),
					subjects: this.getUnicSubject(data.items),
					load: false
				});
			}.bind(this),

			error: function(xhr, status, error) {
				this.setState({
					load: false,
					error
				});
			}.bind(this)
		});

	}

	getUnicGenre(items) {

		const genres = []

		items.map((item) => {
			genres.push(item.genre)
		})

		const uniqueGenre = Array.from(new Set(genres))
		return uniqueGenre
	}

	getUnicSubject(items) {

		const subjects = []

		items.map((item) => {
			subjects.push(item.subject)
		})
		
		const uniqueSubject = Array.from(new Set(subjects))
		return uniqueSubject
	}

	handlerSearch(event) {

		const search = event.target.value
		this.state.search = search
		this.filterItems.bind(this)()
	}

	handlerGenre(event) {

		const genre = event.target.value
		this.state.genre = genre
		this.filterItems.bind(this)()

	}

	handlerSubject() {

		const subject = event.target.value
		this.state.subject = subject
		this.filterItems.bind(this)()

	}

	handlerGrade() {

		const grade = event.target.value
		this.state.grade = grade
		this.filterItems.bind(this)()
		
	}

	filterItems() {
		const filter = this.state.items.filter((item) => {
			const grade = this.state.grade ? item.grade.split(';').includes(this.state.grade) : true
			return grade && 
				   item.genre.toLowerCase().indexOf(this.state.genre.toLowerCase()) >= 0 &&
				   item.subject.toLowerCase().indexOf(this.state.subject.toLowerCase()) >= 0 &&
				   item.title.toLowerCase().indexOf(this.state.search.toLowerCase()) >= 0
		});

		this.setState({ filter })

	}

	handlerSwitchPrice() {

		const switcher = this.state.switcher ? false : true
		this.setState({ switcher })

	}

	render() {

		return (

			<div>
				<h1 className='text-center my-5'>Витрина</h1>
				{ !this.state.load ? 
					<div className='app_wrapper'>
						<div className='app_filter d-flex justify-content-center flex-wrap'>

							<select className='m-3 form-control' id='grade' onChange={ this.handlerGrade.bind(this) }>
								<option value=''>Все классы</option>
								<option value='1' >1 класс</option>
								<option value='2' >2 класс</option>
								<option value='3' >3 класс</option>
								<option value='4' >4 класс</option>
								<option value='5' >5 класс</option>
								<option value='6' >6 класс</option>
								<option value='7' >7 класс</option>
								<option value='8' >8 класс</option>
								<option value='9' >9 класс</option>
								<option value='10' >10 класс</option>
								<option value='11' >11 класс</option>
							</select>

							<select className='m-3 form-control' id='genre' onChange={ this.handlerGenre.bind(this) }>
								<option value=''>Все жанры</option>
								{ this.state.genres.map((item, index) => {
									return (<option key={ index } value={ item } >{ item }</option>)
								}) }
							</select>

							<select className='m-3 form-control' id='subject' onChange={ this.handlerSubject.bind(this) }>
								<option value=''>Все предметы</option>
								{ this.state.subjects.map((item, index) => {
									return (<option key={ index } value={ item } >{ item }</option>)
								}) }
							</select>

							<input className='m-3 form-control' type="text" placeholder='Поиск по title' onChange={ this.handlerSearch.bind(this) }/>
							<label className='m-0 d-flex justify-content-between align-items-center' htmlFor='checkbox'>Переключить цену: <input className='m-3' type='checkbox' id='checkbox' onChange={ this.handlerSwitchPrice.bind(this) }/></label>

						</div>

						{ !this.state.error ?  
							<div className='app_data'>
								<div className='text-center my-3'>Результаты поиска:</div>
								<div className='app_showcase d-flex justify-content-center flex-wrap'>
								{this.state.filter.map((item, index) => {
									return (<Case switcher={ this.state.switcher } key={ index } item = { item }></Case>)
								})}
								</div>
							</div>
						: 
							<div className='app_data'>
								{ this.state.error }
							</div> 
						}
					</div>
				 : 
				 	<div className='app_loader text-center pt-5'>
						Загрузка
					</div>
				}

			</div>

	    )
   	}

}