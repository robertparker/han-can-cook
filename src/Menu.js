import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import logo from './logo.svg';
import './Menu.css';
import ModalLink from './ModalLink';
import { GoogleSpreadsheet } from 'google-spreadsheet';

const SPREADSHEET_ID = `10YPIxz7cMIVn6iFEZZ_WblygJRrfaRoi9Zae6jcN4Hw`;
const doc = new GoogleSpreadsheet(SPREADSHEET_ID)

// TY! https://stackoverflow.com/questions/60349027/cannot-set-property-jwtclient-of-undefined-trying-to-use-node-js-with-google
async function accessSpreadsheet() {
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY
  });

  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
  const rows = await sheet.getRows()
  console.log('hellooolollollol');
  return rows;

}

function createMealDiv(idx, row) {
  return (
    <div key={idx}>
    <p>{row.Item}</p>
    <p className="menuDescription">{row.Description}</p>
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

async function getDivs() {
  let lunchDivs = [];
  let dinnerDivs = [];
  let takeoutDivs = [];
  await accessSpreadsheet().then((rows) => {
    for (let i = 0; i< rows.length; i++) {
      let row = rows[i]
      let idx = i;
      if (row.Meal === 'Lunch'){
        const div = createMealDiv(idx, row);
        lunchDivs.push(div);
      }
      if (row.Meal === 'Dinner'){
        const div = createMealDiv(idx, row);
        dinnerDivs.push(div);
      }
      if (row.Meal === 'Takeout'){
        const div = createTakeoutDiv(idx, row);
        takeoutDivs.push(div);
      }
    }
  })
  const returnDivs = {'Lunch': lunchDivs, 'Dinner': dinnerDivs, 'Takeout': takeoutDivs};
  return returnDivs;
}

function Menu() {
  const [modalShow, setModalShow] = useState(false);
  const [allDivs, setAllDivs] = useState('');
  if (allDivs === ''){
    getDivs().then((returnDivs) => {
      setAllDivs(returnDivs);
    });
  }

  return (
    <div className="Menu">
      <header className="Menu-header">
        <Link to="/"><img src={logo} className="Menu-logo" alt="logo" /></Link>
          Menu
          <br />
          <br />
          <br />
      </header>
      <ModalLink show={modalShow} onHide={() => setModalShow(false)} />
      <div className="row">
        <div className="menuColumn"></div>
        <div className="menuColumn">
          <h3 className="menuHeader">Lunch</h3>
          {allDivs.Lunch}
        </div>
        <div className="menuColumn">

          <h3 className="menuHeader">Dinner</h3>
            {allDivs.Dinner}
        </div>
        <div className="menuColumn"></div>
      </div>
      <div className="row">
        <div className="menuColumnMiddle">
        <br />
        <br />
          <h3 className="menuHeader">Takeout</h3>
          {allDivs.Takeout}
        </div>
      </div>
      <br />
      <br />
  </div>
  );
}

export default Menu;
