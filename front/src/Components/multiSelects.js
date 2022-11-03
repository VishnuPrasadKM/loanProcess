import React from 'react'
import {FaCheck, FaChevronDown} from 'react-icons/fa'
const multiSelects = () => {
  return (
    <div>
        <div class="container">
    <div class="select-btn">
        <span class="btn-text">Select Language</span>
        <span class="arrow-dwn">
            <i class="fa-solid fa-chevron-down"></i>
        </span>
    </div>

    <ul class="list-items">
        <li class="item">
            <span class="checkbox">
                <i class="fa-solid fa-check check-icon"></i>
            </span>
            <span class="item-text">HTML & CSS</span>
        </li>
        <li class="item">
            <span class="checkbox">
                <i class="fa-solid fa-check check-icon"></i>
            </span>
            <span class="item-text">Bootstrap</span>
        </li>
        <li class="item">
            <span class="checkbox">
                <i class="fa-solid fa-check check-icon"></i>
            </span>
            <span class="item-text">JavaScript</span>
        </li>
        <li class="item">
            <span class="checkbox">
                <i class="fa-solid fa-check check-icon"></i>
            </span>
            <span class="item-text">Node.Js</span>
        </li>
        <li class="item">
            <span class="checkbox">
                <i class="fa-solid fa-check check-icon"></i>
            </span>
            <span class="item-text">React JS</span>
        </li>
        <li class="item">
            <span class="checkbox">
                <i class="fa-solid fa-check check-icon"></i>
            </span>
            <span class="item-text">Mango DB</span>
        </li>
    </ul>
</div>
</div>
  )
}

export default multiSelects