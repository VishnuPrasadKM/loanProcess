import React from 'react'
import {FaCheck, FaChevronDown} from 'react-icons/fa'
const multiSelects = () => {
  return (
    <div style={{width:'50px'}}>
    <button>
        <span class="btn-text">COLUMN</span>
        <span class="arrow-dwn">
            <FaChevronDown/>
        </span>
    </button>

    <ul class="list-items">
        <li class="item">
            <span class="checkbox">
                <FaCheck/>
            </span>
            <span class="item-text">HTML & CSS</span>
        </li>
        <li class="item">
            <span class="checkbox">
                <FaCheck/>
            </span>
            <span class="item-text">Bootstrap</span>
        </li>
        <li class="item">
            <span class="checkbox">
                <FaCheck/>
            </span>
            <span class="item-text">JavaScript</span>
        </li>
        <li class="item">
            <span class="checkbox">
                <FaCheck/>
            </span>
            <span class="item-text">Node.Js</span>
        </li>
        <li class="item">
            <span class="checkbox">
                <FaCheck/>
            </span>
            <span class="item-text">React JS</span>
        </li>
        <li class="item">
            <span class="checkbox">
                <FaCheck/>
            </span>
            <span class="item-text">Mango DB</span>
        </li>
    </ul>
</div>
  )
}

export default multiSelects