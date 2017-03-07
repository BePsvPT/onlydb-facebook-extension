import boolean from 'boolean'
import upTo from '../../../utils/up-to'

module.exports = (dom) => {
  const table = [
    { title: '精選動態', description: '於動態時報上嵌入我們精選的熱門動態', key: 'featured-feed' },
    { title: '移除廣告', description: '於動態時報上移除為贊助的動態', key: 'remove-ad' },
    { title: '同步搜尋', description: '於臉書搜尋時，一並於我們專屬資料庫中搜尋', key: 'sync-search' }
  ]

  chrome.storage.local.get('setting', (result) => {
    const setting = result.setting || {}

    dom.innerHTML = table.reduce((html, item) => {
      return html + `
<div class="setting-section">
  <div class="title">
    <b>${item.title}</b>
  </div>
  
  <div class="description">
    <span>${item.description}</span>
  </div>
  
  <div class="operation">
    <span class="success-icon">
      <i class="fa fa-check" aria-hidden="true"></i>
    </span>
    
    <select id="${item.key}">
        <option value="0">Off</option>
        <option value="1" ${boolean(setting[item.key]) ? 'selected' : ''}>On</option>
    </select>
  </div>
</div>`
    }, '')

    document.querySelectorAll('.custom-modal .box .content .setting-section .operation select').forEach(node => {
      node.addEventListener('change', e => {
        setting[e.target.id] = boolean(e.target.value)

        chrome.storage.local.set({ setting }, () => {
          const n = upTo(e.target, 'div').querySelector('span')

          n.className = n.className.replace(/ ?ani/g, '')

          setTimeout(() => { n.className += ' ani' }, 1)
        })
      })
    })
  })
}
