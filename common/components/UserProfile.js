import React, { Component } from 'react'
import countries from '../../public/countries'
import Dropdown from 'react-toolbox/lib/dropdown';
import { Grid, Row } from 'react-flexbox-grid';
import { Card, CardText } from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';

export default class UserProfile extends React.Component {
	checkProfile(){
		if(!this.props.user.firstName){
			return false;
		}
		if(!this.props.user.lastName){
			return false;
		}
		if(!this.props.user.birthday){
			return false;
		}
		if(!this.props.user.nationality){
			return false;
		}
		if(!this.props.user.countryOfResidence){
			return false;
		}

		return true;
	}

	onChangeNationality(value){
		debugger
		this.props.user.nationality = value;
		this.setState();
	}

	onChangeResidence(value){
		this.props.user.countryOfResidence = value;
		this.setState();
	}

	onChangeFirstName(value){
		this.props.user.firstName = value;
		this.setState();
	}

	onChangeLastName(value){
		this.props.user.lastName = value;
		this.setState();
	}

	onChangeBirthday(value){
		this.props.user.birthday = value;
		this.setState();
	}

	onClickUpdate(){
		debugger
		this.props.handleUpdate(this.props.user)
	}



	render() {
		let warning = null;
		if(!this.checkProfile()){
			warning = <Card style={{width: '350px'}}raised >
								<CardText>Ihre Profil ist nicht komplett, bitte ergänzen Sie die Fehlenden Feldern</CardText>
							</Card>
		}

		return (
			<div>
				<Grid>
					<Row center="lg">
					{warning}
					</Row>
					<br/>
					<h1>Ihre Profil</h1>

					<Input type='email' label='Email' name='email' value={this.props.user.email} disabled/>
					<Input type='text' label='Vorname' name='firstName' value={this.props.user.firstName}
								 onChange={this.onChangeFirstName.bind(this)}/>
					<Input type='text' label='Nachname' name='lastName' value={this.props.user.lastName}
								 onChange={this.onChangeLastName.bind(this)}/>
					<Input type='date' label='Geburtstag' name='birthday' value={this.props.user.birthday}
								 onChange={this.onChangeBirthday.bind(this)}/>

					<Dropdown
						auto
						source={countries}
						value={this.props.user.nationality}
						label='Staatsangehörigkeit'
						onChange={this.onChangeNationality.bind(this)}
					/>

					<Dropdown
						auto
						source={countries}
						value={this.props.user.countryOfResidence}
						label='Wohnsitz'
						onChange={this.onChangeResidence.bind(this)}
					/>

					<Button icon='save' label='Speichern' onClick={this.onClickUpdate.bind(this)} raised/>
				</Grid>
			</div>
		)

	}
}