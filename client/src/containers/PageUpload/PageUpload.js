import React, {Component} from "react";
import { push } from "react-router-redux";
import TextField from "material-ui/TextField";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';

import Form from "components/Form/Form";
import makeMaterial from "helpers/MaterialHelper";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  addVideo,
  setUploadCompleted
} from "modules/files";

import styles from "./PageUpload.css";


const Input = ((props) => <TextField {...props} />);
const MaterialInput = makeMaterial(Input);

const Select = ((props) => <SelectField {...props} />);
const MaterialSelect = makeMaterial(Select);

const WrappedTextField = ((props) => <TextField {...props} />);
const MaterialTextField = makeMaterial(WrappedTextField);

const categories = [
  <MenuItem key={1} value={1} primaryText="Space" />,
  <MenuItem key={2} value={2} primaryText="Nature" />,
  <MenuItem key={3} value={3} primaryText="Cities" />
];

// TODO: import from somewhere
const currency = [
  {value: 1, text: "EUR"},
  {value: 2, text: "USD"},
  {value: 3, text: "JPY"},
];

const currencyOptions = currency.map((currency) =>
  <MenuItem key={currency.value} value={currency.value} primaryText={currency.text} />,
);

class PageUpload extends Component {

  __formName = "uploadForm";
  __form = null;
  __file = null;

  constructor(props) {
    super(props);

    this.state = {
      isFormValid: false,
      isFormDirty: false,
      shouldUploadAnother: false
    };
  }

  componentDidMount() {
    this.props.uploadCompleted
      && typeof(this.props.actions.setUploadCompleted) === "function"
      && this.props.actions.setUploadCompleted(false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.uploadCompleted !== this.props.uploadCompleted && nextProps.uploadCompleted) {
      this.state.shouldUploadAnother ? this.__clearForm() : this.props.actions.push("/uploads");
    }
  }

  __onFormChange(form) {
    !this.__form && (this.__form = {name: form.formName, fields: {}});
    this.__form.fields[form.name] = form;

    let isFormValid = this.__isFormValid();
    isFormValid !== this.state.isFormValid &&  this.setState({isFormValid});
  }

  __isFormValid() {
    return !!this.__form
      && !!this.__file
      && !Object.keys(this.__form.fields).some((field) => !this.__form.fields[field].isValid);
  }

  __onFileUpload(event) {
    this.__file = event.target.files[0];

    let isFormValid = this.__isFormValid();
    if (isFormValid !== this.state.isFormValid) {
      this.setState({isFormValid, hasFileUploaded: !!this.__file});
    } else {
      this.__file !== this.state.hasFileUploaded && this.setState({hasFileUploaded: !!this.__file});
    }
  }

  __clearForm() {

    Object.keys(this.__form.fields).forEach((field) => {
      this.__form.fields[field].isDirty = false;
      this.__form.fields[field].value = "";
    });

    this.__file = false;

    this.setState({isFormDirty: false, isFormValid: false, hasFileUploaded: false}, () => {
      this.props.actions.setUploadCompleted(false);
    })
  }

  __toggleUploadAnother() {
    this.setState({shouldUploadAnother: !this.state.shouldUploadAnother});
  }

  __onFormSubmit({isPublished}) {
    let formData = new FormData();

    if (!this.state.isFormValid) {
      Object.keys(this.__form.fields).forEach((field) => {
        this.__form.fields[field].isDirty = true;
      });

      this.setState({isFormDirty: true});
      return;
    }

    formData.append("file", this.__file);
    formData.append("published", !!isPublished);
    for ( var key in this.__form.fields ) {
      formData.append(key, this.__form.fields[key].value || undefined);
    }
    formData.set("currency", currency.filter(el =>
      parseInt(el.value, 10) === parseInt(formData.get("currency"), 10)
    )[0].text);

    typeof(this.props.actions.addVideo) === "function"
      && this.props.actions.addVideo(formData);
  }

  render() {
    const { hasFileUploaded, isFormValid, isFormDirty } = this.state;
    const dirtyObject = {}, formValues = {};
    const fileInputStyles = {
      color: hasFileUploaded
        ? "green"
        : isFormDirty
          ? "red"
          :"rgba(0 ,0, 0, .87)"
    }

    this.__form && this.__form.fields && Object.keys(this.__form.fields).forEach((field) => {
      dirtyObject[field] = this.__form.fields[field].isDirty;
      formValues[field] = this.__form.fields[field].value;
    });

    return (<div className={ styles.container }>
      <div className={ styles.title }> Upload your video </div>
      <Form name={ this.__formName } onFormChange={ this.__onFormChange.bind(this) }>
        <div className={ styles.fileUpload }>
          <div className={ styles.fileUploadBlock }>
            <div className={ styles.iconUpload }>theaters</div>
            <RaisedButton
              label="upload footage"
              labelPosition="after"
              containerElement="label"
              icon={<i style={ fileInputStyles } className="material-icons">file_upload</i>}
            >
              <input
                onChange={ this.__onFileUpload.bind(this) }
                onClick={(event) => { event.target.value = null; }}
                type="file"
                className={ styles.fileInput }/>
            </RaisedButton>
          </div>
        </div>
        <div className={ styles.indentedContainer }>
          <div className={ styles.videoTitle }>
            <MaterialInput
              isDirty={dirtyObject.title}
              fullWidth
              id="title"
              name="title"
              hintText="Add video title"
              floatingLabelText="Add video title"
              errorText={this.props.requestError || this.props.error}
              value={formValues.title || ""}
              required/>
          </div>
          {/** temporary disabled **/}
          { false && (<div>
            <div className={ styles.categoryInput }>
              <MaterialSelect
                fullWidth={ true }
                floatingLabelText="Category"
                value={formValues.category}
                disabled
              >
                { categories }
              </MaterialSelect>
            </div>
            <IconButton
              className={ styles.addNewCategory }
              iconClassName="material-icons"
              tooltip="Add another category"
              tooltipPosition="bottom-center"
              iconStyle={{color: "rgba(0, 0, 0, 0.54)"}}
              disabled
            >
              add_circle_outline
            </IconButton>
          </div>) }
          <div className={ styles.priceBlock }>
            <MaterialInput
              isDirty={dirtyObject.price}
              className={ styles.priceInput }
              id="price"
              name="price"
              hintText="Price"
              floatingLabelText="Price"
              errorText={this.props.requestError || this.props.error}
              value={formValues.price || ""}
              required/>
            <MaterialSelect
              isDirty={dirtyObject.currency}
              name="currency"
              className={ styles.currencyInput }
              floatingLabelText="Currency"
              defaultValue={1}
              value={ formValues.currency }
              required
            >
              { currencyOptions }
            </MaterialSelect>
          </div>
          <div className={ styles.descriptionInput }>
            <MaterialTextField
              isDirty={dirtyObject.description}
              className={ styles.descriptionTextField }
              fullWidth
              floatingLabelText="Add description"
              hintText="Add description"
              name="description"
              value={ formValues.description }
              multiLine={true}
              rows={2}
              rowsMax={4}/>
          </div>
          <div className={ styles.keywordsInput }>
            <MaterialInput
              isDirty={dirtyObject.keywords}
              fullWidth
              id="keywords"
              name="keywords"
              hintText="Keywords (comma separated)"
              floatingLabelText="Keywords (comma separated)"
              errorText={this.props.requestError || this.props.error}
              value={ formValues.keywords || ""}
              onChange={ this.props.onChange || (() => {}) }/>
          </div>
          <div className={ styles.ownerInput }>
            <MaterialInput
              fullWidth
              isDirty={dirtyObject.owner}
              id="owner"
              name="owner"
              hintText="Owner"
              floatingLabelText="Owner"
              errorText={this.props.requestError || this.props.error}
              value={formValues.owner || ""}
              onChange={ this.props.onChange || (() => {}) }/>
          </div>
          <div className={ styles.anotherToggle }>
            <Toggle
              onToggle={ this.__toggleUploadAnother.bind(this) }
              label="Upload another one"
              labelStyle={{color: "rgba(0, 0, 0, .58)"}}
              labelPosition="right"/>
          </div>
          <RaisedButton
            onTouchTap={ this.__onFormSubmit.bind(this) }
            disabled={ !isFormValid && isFormDirty }
            className={ styles.saveBtn }
            label="save"
            primary={true}/>
          <RaisedButton
            onTouchTap={ this.__onFormSubmit.bind(this, {isPublished: true}) }
            disabled={ !isFormValid && isFormDirty }
            label="publish"
            secondary={true}/>
        </div>
      </Form>
    </div>);
  }
};

const mapStateToProps = state => {
  const files = state.get("files");
  return ({
    uploadCompleted: files.get("uploadCompleted")
  });
};

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({
    addVideo,
    setUploadCompleted,
    push: (route) => push(route)
  }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageUpload);