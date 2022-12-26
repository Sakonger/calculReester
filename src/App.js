import { useState, useRef } from 'react';
import { cloneDeep } from 'lodash';
import korova from './korova.mp4';
import './App.scss';

function App() {
  const [file , setFile] = useState([])
  const [fileString, setFileString] = useState()
  const [selectedId, setSelectedId] = useState()
  const [data, setData] = useState({})
  const [newArr, setNewArr] = useState([])
  const [newVersion, setNewVersion] = useState()
  const [newNumber, setNewNumber] = useState()
  const [download, setDownload] = useState()
  const [total, setTotal] = useState()
  const [inputDate, setInputDate] = useState()
  const [dateСalculation, setDateСalculation] = useState()

  const vidos = useRef()



  function onChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const arr = event.target.result.split('=hex:')

      console.log(arr)

      setFileString(event.target.result)

      arr.shift()


      const newArr = arr.map(element => {
        const dlaPop = element.split('\r\n')
        dlaPop.pop()
        return dlaPop.map(element => {
          const govno = element.replace(/\s|\\/g, '')
          return govno.split(',').filter((element) => element)
        });

    });
      console.log(newArr)
      setFile(newArr)
    };
    reader.readAsText(file);

    vidos.current.play()
  }

  function сalсulated(i) {

    const [n1, n2] = file[i][0][8].split('')
    const [n3, n4] = file[i][0][9].split('')
    const [n5, n6] = file[i][0][10].split('')
    const [n7, n8] = file[i][0][11].split('')
    console.log(n1, n2, n3, n4)

    const x1 = parseInt(n1, 16) * 1048576;
    const x2 = parseInt(n2, 16) * 65536;
    const x3 = parseInt(n3, 16) * 268435456;
    const x4 = parseInt(n4, 16) * 16777216;
    const x5 = parseInt(n5, 16) * 16;
    const x6 = parseInt(n6, 16) * 1;
    const x7 = parseInt(n7, 16) * 4096;
    const x8 = parseInt(n8, 16) * 256;
    const total = x1 + x2 + x3 + x4 + x5 + x6 + x7 + x8;
    console.log(total)

    const v = file[i][1][14];



    // const versia = version[t2];
    // console.log(versia)

    const [z1, z2] = file[i][2][10].split('');
    const [z3, z4] = file[i][2][11].split('');
    const y1 = parseInt(z1, 16) * 16;
    const y2 = parseInt(z2, 16) * 1;
    const y3 = parseInt(z3, 16) * 4096;
    const y4 = parseInt(z4, 16) * 256;
    const date = y1 + y2 +y3 +y4 + 25569
    console.log(y1, y2, y3, y4 ,date)

    setSelectedId(i)
    setData({
      number: total,
      version: v,
      dataLic: date,
      para1: file[i][2][10],
      para2: file[i][2][11]
    })

    setNewArr(cloneDeep(file[i]))

  }



  const choiceVersions = (e) => {
    const value = e.target.value
    const version = {
      Industrial: '00',
      Educational1: '01',
      Dealer: '02',
      Control: '03',
      Educational4: '04',
      Educational5: '05',
      Student: '06'
    }

    const versia = version[value]
    console.log(versia)
    setNewVersion(versia)

    const arrForChanges = cloneDeep(newArr)

    arrForChanges[1][14] = versia;

    console.log(arrForChanges[1][14])

    setNewArr(arrForChanges)
    // setNewArr(forChanges)
  };

  function ExcelDateToJSDate(serial) {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);

    var fractional_day = serial - Math.floor(serial) + 0.0000001;

    var total_seconds = Math.floor(86400 * fractional_day);

    var seconds = total_seconds % 60;

    total_seconds -= seconds;

    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
  }

  function JSDateToExcelDate(inDate) {

    var returnDateTime = 25569.0 + ((inDate.getTime() - (inDate.getTimezoneOffset() * 60 * 1000)) / (1000 * 60 * 60 * 24));
    return returnDateTime.toString().substr(0, 5);

  }

  function changeNumber() {
    const intensity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "a", "b", "c", "d", "e", "f"];
    let randomNumber1 = intensity[Math.floor(Math.random() * intensity.length)];
    let randomNumber2 = intensity[Math.floor(Math.random() * intensity.length)];
    let randomNumber3 = intensity[Math.floor(Math.random() * intensity.length)];
    let randomNumber4 = intensity[Math.floor(Math.random() * intensity.length)];
    let randomNumber5 = intensity[Math.floor(Math.random() * intensity.length)];
    let randomNumber6 = intensity[Math.floor(Math.random() * intensity.length)];
    let randomNumber7 = intensity[Math.floor(Math.random() * intensity.length)];
    let randomNumber8 = intensity[Math.floor(Math.random() * intensity.length)];

    const n1 = `${randomNumber1}${randomNumber2}`;
    const n2 = `${randomNumber3}${randomNumber4}`;
    const n3 = `${randomNumber5}${randomNumber6}`;
    const n4 = `${randomNumber7}${randomNumber8}`;

    const arrForChanges = cloneDeep(newArr)

    arrForChanges[0][8] = n1;
    arrForChanges[0][9] = n2;
    arrForChanges[0][10] = n3;
    arrForChanges[0][11] = n4;

    const newTotal = parseInt((n1 + n2 + n3 + n4), 16)

    setTotal(newTotal)

    setNewArr(arrForChanges)

    // setNewNumber()

  }

  const changeDate = () => {
    const arrForChanges = cloneDeep(newArr)

    const soedenil = data.para2 + data.para1

    setData({ ...data, dataLic: Number(parseInt(soedenil, 16)) + Number(inputDate) + 25569})

    const [l1, l2] = (Number(parseInt(soedenil, 16)) + Number(inputDate)).toString(16).match(/.{1,2}/g)

    arrForChanges[2][10] = l2
    arrForChanges[2][11] = l1

    setNewArr(arrForChanges)
  }

  const getFile = () => {
    const finalArr = cloneDeep(newArr)

    const arrStrings = finalArr.map((element, i) => {
      let string = element.join(',');
      if(i !== finalArr.length - 1) {
        string = `${string},\\\r\n`
      }
      if(i !== 0) {
        string = `  ${string}`
      }
      return string
    })
    const splitString = fileString.split('=hex:')
    splitString.shift()
    const currentString = splitString[selectedId].split('\r\n').slice(0, -1).join('\r\n')
    const newFile = fileString
    const finalString = arrStrings.join('')
    const ITOG = newFile.replace(currentString, finalString)

    const file = new Blob([ITOG], {
      type: 'txt',
    });

    const loadFile = window.URL.createObjectURL(file);

    setDownload(loadFile)

    // console.log(splitString[selectedId])
    console.log(ITOG)
    console.log(file)
    // console.log(currentString)
    // console.log(finalString)
  }






  return (
    <div className="App">
      <h1> Я сделяль </h1>
      <input  type='file' onChange={onChange}></input>
      <button className='btn' onClick={() => setSelectedId(0)}>назад</button>
      {/* <button onClick={сalсulated}>накакай на меня</button> */}
      {/* {version.map((n) => <option value={n} selected={this.state.selected === n}>{n}</option>)} */}

      {selectedId ? (
        <div>
          <ul>
            {file[selectedId].map((element) =>
              <li>
                {element.map((element) =>
                  <span>
                    {element}
                  </span>)}
                <br />
              </li>)}
          </ul>
        </div>
        ) : (
          <ol >
            {file.map((element, i) =>
              <li onClick={() => сalсulated(i)} className='li'>
                <ul>
                  {element.map((element) =>
                    <li>
                      {element.map((element) =>
                        <span>
                          {element}
                        </span>)}
                      <br />
                    </li>)}
                </ul>
              </li>
            )}
          </ol>
        )
      }
    <div className='info'>
      <div >{data.number} Старая лицензия</div>
      <div>{total} Новая лицензия</div>
      <div>{ExcelDateToJSDate(data.dataLic).toLocaleDateString()} Дата лицензии</div>
      <div>{data.version} Старая версия</div>
    </div>


    <button className='button' onClick={changeNumber}>меняем лицензию</button>
    <input className='button inputDate' onChange={(e) => setInputDate(e.target.value)} type='number'></input>
    <button className='button' onClick={changeDate}>добавить дней</button>


      <select className='button select' onChange={choiceVersions}>
        <option value={'Industrial'}>Industrial</option>
        <option value={'Educational1'}>Educational</option>
        <option value={'Dealer'}>Dealer</option>
        <option value={'Control'}>Control</option>
        <option value={'Educational4'}>Educational</option>
        <option value={'Educational5'}>Educational</option>
        <option value={'Student'}>Student</option>
    </select>

    <div>
        <div>
          <ul>
            {newArr.map((element) =>
              <li>
                {element.map((element) =>
                  <span>
                    {element}
                  </span>)}
                <br />
              </li>)}
          </ul>
        </div>
    </div>

      <button className='button' onClick={getFile}>получить строку</button>
      {
        download && (
          <a
            className='link'
            download={'ля че наделал.reg'}
            href={download}
          >
            скачать фаил
          </a>
        )
      }

      <video className='korova' ref={vidos} controls width="400" height="300">
        <source src={korova} type="video/mp4"></source>
    </video>
    </div>
  );
}

export default App;
