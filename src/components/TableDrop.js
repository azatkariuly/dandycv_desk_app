import React, { useRef, useState } from 'react'

import '../css/TableDrop.css'

import addBtn from '../images/add-button.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

function TableDrop(props) {
    const [loading, setLoading] = useState(false)
    const inputRef = useRef()

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    async function handleDrop(event, drop=false) {
        // event.preventDefault();
        setLoading(true)

        var fileList = drop ? event.target.files : event.dataTransfer.files
        var myFiles = []

        for (var i=0; i<fileList.length; i++) {
            if (isImageFile(fileList[i])) {
                var res = await getImageResolution(fileList[i])

                // fileList[i]['resolution'] = res.width + 'x' + res.height
                fileList[i]['width'] = res.width
                fileList[i]['height'] = res.height

                fileList[i]['date'] = new Date()
                fileList[i]['process'] = ''
                fileList[i]['done'] = false

                myFiles = [...myFiles, fileList[i]]
            } else {
                props.setErrorMessage('Only JPG and PNG images are currently supported')
                props.setErrorPopup(true)
                break
            }
        }

        props.setFiles([...props.files, ...myFiles])

        setLoading(false)
    };

    const handleSelectAll = event => {
        props.setSelectAll(event.target.checked);

        if (event.target.checked) {
          props.setSelectedRows(Array.from(props.files).map((file, idx) => idx));
        } else {
          props.setSelectedRows([]);
        }

    };

    function getImageResolution(file) {
        return new Promise((resolve, reject) => {
            const image = new Image();

            image.onload = () => {
                const width = image.width;
                const height = image.height;
                resolve({width, height})
            }

            image.onerror = () => {
                reject(new Error('Failed to load the image'));
            };
    
            image.src = URL.createObjectURL(file);
        })
    }

    function isImageFile(file) {
        const acceptedImageTypes = ['image/png', 'image/jpeg']
        return file && acceptedImageTypes.includes(file['type'])
    }

    function formatDate(date) {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString().slice(-2);
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
        const amPm = hours >= 12 ? "pm" : "am";
    
        // Convert to 12-hour format and adjust midnight and noon
        if (hours === 0) {
            hours = 12;
        } else if (hours > 12) {
            hours -= 12;
        }
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${amPm}`;
    }

    function shortenBytes(n) {
        const k = n > 0 ? Math.floor((Math.log2(n)/10)) : 0;
        const rank = (k > 0 ? 'KMGT'[k - 1] : '') + 'b';
        const count = (n / Math.pow(1000, k)).toFixed(1);
        return count + rank;
    }

    const handleMouseDown = (event, index) => {
        event.preventDefault();

        if (!props.selectedRows.includes(index)) {
            if (props.selectedRows.length+1 === props.files.length) {
                props.setSelectAll(true)
            }
            props.setSelectedRows([...props.selectedRows, index])
        } else {
            props.setSelectedRows(props.selectedRows.filter(rowId => rowId !== index))
            props.setSelectAll(false)
        }
        

        
        
    }

    return (
        <div
            className='dropzone-main'
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {props.files.length === 0 ? (
                <div className='dropzone-input'>
                    <input
                        type='file'
                        accept='image/*'
                        multiple
                        onChange={(event) => handleDrop(event, true)}
                        hidden
                        ref={inputRef}
                    />
                    {loading ? (
                        <span className="loader"></span>
                    ) : (
                        <img src={addBtn} alt='' onClick={() => inputRef.current.click()}></img>
                    )}
                </div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>
                                <div className='checkbox-wrapper'>
                                    <input
                                        type="checkbox"
                                        checked={props.selectAll}
                                        onChange={handleSelectAll}
                                    />
                                </div>
                            </th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Size</th>
                            <th>Resolution</th>
                            <th>Process</th>
                        </tr>
                    </thead>
                    <tbody>
                            {Array.from(props.files).map(
                                (file, idx) => (
                                    <tr
                                        key={idx}
                                        onMouseDown={(e) => handleMouseDown(e, idx)}
                                        className='table-row'
                                    >
                                        <td>
                                            <div className='checkbox-wrapper'>
                                                <input
                                                    type="checkbox"
                                                    checked={props.selectedRows.includes(idx)}
                                                    // onChange={e => handleCheckboxChange(e, idx)}
                                                />
                                            </div>
                                        </td>
                                        <td>{file.name.substring(0, file.name.lastIndexOf('.'))}</td>
                                        <td>{formatDate(file.date)}</td>
                                        <td>{file.name.split('.').pop().toLowerCase()}</td>
                                        <td>{shortenBytes(file.size)}</td>
                                        <td>{file.width}x{file.height}</td>
                                        <td>{file.done ? (<FontAwesomeIcon icon={faCheck} style={{color: 'green'}} />) : (file.process)}</td>
                                    </tr>
                                )
                            )}
                    </tbody>
                </table>                
            )}

        </div>
    )
}

export default TableDrop