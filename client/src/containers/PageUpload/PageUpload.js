import React, {Component} from "react";
import TextField from "material-ui/TextField";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import Form from "components/Form/Form";
import makeMaterial from "helpers/MaterialHelper";

import styles from "./PageUpload.css";

const input = ((props) => <TextField {...props} />);
const MaterialInput = makeMaterial(input);

const select = ((props) => <SelectField {...props} />);
const MaterialSelect = makeMaterial(select);

const categories = [
  <MenuItem key={1} value={1} primaryText="Space" />,
  <MenuItem key={2} value={2} primaryText="Nature" />,
  <MenuItem key={3} value={3} primaryText="Cities" />
];

const prices = [
  <MenuItem key={1} value={1} primaryText="EUR" />,
  <MenuItem key={2} value={2} primaryText="USD" />,
  <MenuItem key={3} value={3} primaryText="JPY" />
];

class PageUpload extends Component {

  constructor(props) {
    super(props);
  }

  render() {


    return (<div className={ styles.container }>
      <div className={ styles.title }> Upload your video </div>
      <Form name="uploadForm" onFormChange={ ()=>{} }>
        <div className={ styles.fileUpload }>
          <div className={ styles.fileUploadBlock }>
            <div className={ styles.iconUpload }>theaters</div>
            <RaisedButton
              label="upload footage"
              labelPosition="after"
              containerElement="label"
              icon={<i className="material-icons">file_upload</i>}
            >
              <input type="file" className={ styles.fileInput }/>
            </RaisedButton>
          </div>
        </div>
        <div className={ styles.indentedContainer }>
          <div className={ styles.videoTitle }>
            <MaterialInput
              fullWidth
              id="title"
              name="title"
              hintText="Add video title"
              floatingLabelText="Add video title"
              errorText={this.props.requestError || this.props.error}
              value={this.props.title || ""}
              required/>
          </div>
          <div>
            <div className={ styles.categoryInput }>
              <MaterialSelect
                fullWidth={ true }
                floatingLabelText="Category"
                value={this.props.category}
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
          </div>
          <div className={ styles.priceBlock }>
            <MaterialInput
              className={ styles.priceInput }
              id="price"
              name="price"
              hintText="Price"
              floatingLabelText="Price"
              errorText={this.props.requestError || this.props.error}
              value={this.props.price || ""}
              required/>
            <SelectField
              className={ styles.currencyInput }
              floatingLabelText="Price"
            >
              { prices }
            </SelectField>
          </div>
          <div className={ styles.descriptionInput }>
            <TextField
              className={ styles.descriptionTextField }
              fullWidth
              floatingLabelText="Add description"
              hintText="Add description"
              multiLine={true}
              rows={2}
              rowsMax={4}/>
          </div>
          <div className={ styles.keywordsInput }>
            <MaterialInput
              fullWidth
              id="keywords"
              name="keywords"
              hintText="Keywords (comma separated)"
              floatingLabelText="Keywords (comma separated)"
              errorText={this.props.requestError || this.props.error}
              value={this.props.keywords || ""}
              onChange={ this.props.onChange || (() => {}) }
              required/>
          </div>
          <div className={ styles.ownerInput }>
            <MaterialInput
              fullWidth
              id="owner"
              name="owner"
              hintText="Owner"
              floatingLabelText="Owner"
              errorText={this.props.requestError || this.props.error}
              value={this.props.owner || ""}
              onChange={ this.props.onChange || (() => {}) }/>
          </div>
          <div className={ styles.anotherToggle }>
            <Toggle
              label="Upload another one"
              labelStyle={{color: "rgba(0, 0, 0, .58)"}}
              labelPosition="right"/>
          </div>
          <RaisedButton className={ styles.saveBtn } label="save" primary={true}/>
          <RaisedButton label="publish" secondary={true}/>
        </div>
      </Form>
    </div>);
  }
};

export default PageUpload;