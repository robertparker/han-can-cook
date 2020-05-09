import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import logo from './deborahLogo.svg';
import './Menu.css';
import ModalLink from './ModalLink';
import { GoogleSpreadsheet } from 'google-spreadsheet';


const SPREADSHEET_ID = `10YPIxz7cMIVn6iFEZZ_WblygJRrfaRoi9Zae6jcN4Hw`;
const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const doc = new GoogleSpreadsheet(SPREADSHEET_ID)
doc.useApiKey(googleApiKey);
// TY! https://stackoverflow.com/questions/60349027/cannot-set-property-jwtclient-of-undefined-trying-to-use-node-js-with-google
async function getMenuSheet() {
  console.log('getting menuSheet');
  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
  const rows = await sheet.getRows()
  return rows;
}

async function getSectionsSheet() {
  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[1]; // or use doc.sheetsById[id]
  const rows = await sheet.getRows()
  return rows;
}

function createMealDiv(idx, row) {
  // if(row.Section == 'Takeout'){
  //   return createTakeoutDiv(idx, row);
  // }
  return (
    <div key={idx}>
    <p dangerouslySetInnerHTML={{__html:row.Item, sanitize: true}}></p>
    <p className="menuDescription" dangerouslySetInnerHTML={{__html:row.Description, sanitize: true}}></p>
    </div>
  )
}

function createTakeoutDiv(idx, row) {
  return (
    <div key={idx}>
    <p><Link to={row.TakeoutLink}>{row.Description}</Link></p>
    </div>
  )
}

function createSection(num, menuItemData){
  let menuItemDivs = [];
  // for (let [sectionName, value] in menuItemData.entries()) {
  Object.keys(menuItemData).forEach(function(key) {
    let value = menuItemData[key];
    if (value['location'] === num) {
      menuItemDivs.push((
        <div><h3 className="menuHeader" key={key}>{key}</h3>
        { value['divs'] }<br /></div>
      ))
    }
  });
  return menuItemDivs;

}

async function getMenuItems() {
  // let lunchDivs = [];
  // let dinnerDivs = [];
  // let takeoutDivs = [];
  let menuItemData = {};
  // let sections = [];
  await getSectionsSheet().then((rows) => {
    for (let k = 0; k < rows.length; k++){
      let row = rows[k];
      menuItemData[row.SectionName] = {'location': row.Location, 'divs': []};
    }
  });

  await getMenuSheet().then((rows) => {
    for (let idx = 0; idx < rows.length; idx++) {
      let row = rows[idx];
      let divs = menuItemData[row.Section]['divs'];
      const div = createMealDiv(idx, row);
      divs.push(div);
      menuItemData[row.Section]['divs'] = divs;
    }
  });

  return menuItemData;
}

function Menu() {
  const [modalShow, setModalShow] = useState(false);
  const [menuItems, setMenuItems] = useState('');
  if (menuItems == ''){
    getMenuItems().then((menuItemData) => {
      setMenuItems(menuItemData);
    });
  }

  return (
    <div className="Menu">
      <header className="Menu-header">
        <Link to="/"><img src={logo} className="Menu-logo" alt="logo" /></Link>
        <br />
        {/* Section 1 */}
          { createSection('1', menuItems) }
      </header>
      <ModalLink show={modalShow} onHide={() => setModalShow(false)} />
      <div className="row">
        <div className="menuColumn"></div>
        <div className="menuColumn">
          {/* Section 2 */}
          { createSection('2', menuItems) }
        </div>
        <div className="menuColumn">
        {/* Section 3 */}
        { createSection('3', menuItems) }
        </div>
        <div className="menuColumn"></div>
      </div>
      <div className="row">
        <div className="menuColumnMiddle">
        <br />
        <br />
        {/* Section 4 */}
        { createSection('4', menuItems) }
        </div>
      </div>
        <br />
        <br />
    </div>
  );
}

export default Menu;
