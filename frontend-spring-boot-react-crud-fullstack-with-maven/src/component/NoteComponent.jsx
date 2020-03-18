import React, { Component } from 'react';
import NotepadDataService from '../service/NotepadDataService';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export const USER_SESSION_NAME = 'authenticatedUser'

class NoteComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      description: ''
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)
  }

  componentDidMount() {
    //if creating note don't retrieve Description
    if (this.state.id === -1) {
      return
    }

    NotepadDataService.retrieveNote(this.state.id)
      .then(
        response => this.setState({
        description: response.data.note
      }))
  }

  onSubmit(values) {
    let note = {
      id: this.state.id,
      note: values.description,
      targetDate: values.targetDate
    }

      NotepadDataService.updateNote(this.state.id, note)
        .then(() => {
          if(sessionStorage.getItem(USER_SESSION_NAME) === "admin") {
            this.props.history.push('/notesAndUsers');
          } else {
            this.props.history.push('/notes')
          }
        })
    }

  validate(values) {
    let errors = {}
    if (!values.description) {
      errors.description = 'Enter something mate'
    } else if (values.description.lenght > 200) {
      errors.description = 'It\'s a note, not an essay'
    }
    return errors
  }

  render() {

    let {description, id} = this.state

    return(
      <div>
                <h3>Note</h3>
                <div className="container">
                  <Formik
                    enableReinitialize={true}
                    initialValues={{ id, description }}
                    onSubmit={this.onSubmit}
                    validate={this.validate}
                    validateOnBlur={false}
                    validateOnChange={false}
                  >
                    {
                      (props) => (
                        <Form>
                          <ErrorMessage name="description" component="div"
                            className="alert alert-warning" />
                          <fieldset className="form-group">
                            <label>Id</label>
                            <Field className="form-control" type="text" name="id" disabled />
                          </fieldset>
                          <fieldset className="form-group">
                            <label>Description</label>
                            <Field className="form-control" type="text" name="description" />
                          </fieldset>
                          <button className="btn btn-success" type="submit">Save</button>
                        </Form>
                      )
                    }
                  </Formik>
                </div>
        </div>
    )
  }
}

export default NoteComponent
