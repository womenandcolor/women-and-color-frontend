// Npm
import axios from 'axios';
import lodash from 'lodash';

const getCookie = (name) => {
    return lodash.chain(document.cookie && document.cookie.split(';'))
        .filter(Boolean)
        .map(lodash.trim)
        .map(c => lodash.split(c, '='))
        .find(c => c[0] === name)
        .last()
        .value();
}

export default axios.create({
  headers: { 'X-CSRFToken': getCookie('csrftoken') }
});
