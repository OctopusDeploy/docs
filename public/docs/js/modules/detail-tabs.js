/**
 * This javascript file comes from Astro Accelerator
 * Edits will be overwritten if you change the file locally
 */
import { qs, qsa } from './query.js';

function unique(value, index, array) {
    return array.indexOf(value) === index;
}

/** 
 * Converts <detail data-group="id"> into tabs
*/
function enhanceDetailGroups() {
    const details = qsa('details[data-group]');
    const groups = [];

    details.forEach(d => d.dataset && d.dataset.group && groups.push(d.dataset.group));
    let uniqueGroups = groups.filter(unique);

    uniqueGroups.forEach(g => {
        const participants = qsa(`details[data-group='${ g }']`);
        if (participants.length === 0) {
            return;
        }

        const tablist = document.createElement('div');
        tablist.role = 'tablist';
        tablist.className = 'tab-list';
        participants[0].parentNode.insertBefore(tablist, participants[0]);
        
        participants.forEach((p, i) => {

            const heading = qs('summary', p);

            // Create the tab panel

            const tabPanel = document.createElement('div');
            tabPanel.setAttribute('tabindex', '0');
            tabPanel.setAttribute('role', 'tabpanel');
            tabPanel.setAttribute('aria-labelledby', `aatb_${ g }_${ i }`);
            tabPanel.id = `aatb_panel_${ g }_${ i }`;

            const content = document.createElement('div');
            content.innerHTML = p.innerHTML;
            const contentSummary = qs('summary', content);
            content.removeChild(contentSummary);

            tabPanel.appendChild(content);

            participants[0].parentNode.insertBefore(tabPanel, participants[0]);

            // Create the tab control

            const tabButton = document.createElement('button');
            tabButton.id = `aatb_${ g }_${ i }`;
            tabButton.type = 'button';
            tabButton.setAttribute('role', 'tab');
            tabButton.setAttribute('aria-selected', i == 0 ? 'true' : 'false');
            tabButton.setAttribute('aria-controls', tabPanel.id);

            const tabHeading = document.createElement('span');
            tabHeading.className = 'focus';
            tabHeading.innerText = heading.innerText;
            
            tabButton.appendChild(tabHeading);
            tablist.appendChild(tabButton);
        });

        new TabsManual(tablist);

        participants.forEach((p, i) => {
            p.parentNode.removeChild(p);
        });

        // remove details elements
    });
    
}

class TabsManual {
    constructor(groupNode) {
      this.tablistNode = groupNode;
  
      this.tabs = [];
  
      this.firstTab = null;
      this.lastTab = null;
  
      this.tabs = Array.from(this.tablistNode.querySelectorAll('[role=tab]'));
      this.tabpanels = [];
  
      for (var i = 0; i < this.tabs.length; i += 1) {
        var tab = this.tabs[i];
        var tabpanel = document.getElementById(tab.getAttribute('aria-controls'));
  
        tab.tabIndex = -1;
        tab.setAttribute('aria-selected', 'false');
        this.tabpanels.push(tabpanel);
  
        tab.addEventListener('keydown', this.onKeydown.bind(this));
        tab.addEventListener('click', this.onClick.bind(this));
  
        if (!this.firstTab) {
          this.firstTab = tab;
        }
        this.lastTab = tab;
      }
  
      this.setSelectedTab(this.firstTab);
    }
  
    setSelectedTab(currentTab) {
      for (var i = 0; i < this.tabs.length; i += 1) {
        var tab = this.tabs[i];
        if (currentTab === tab) {
          tab.setAttribute('aria-selected', 'true');
          tab.removeAttribute('tabindex');
          this.tabpanels[i].classList.remove('is-hidden');
        } else {
          tab.setAttribute('aria-selected', 'false');
          tab.tabIndex = -1;
          this.tabpanels[i].classList.add('is-hidden');
        }
      }
    }
  
    moveFocusToTab(currentTab) {
      currentTab.focus();
      this.setSelectedTab(currentTab);
    }
  
    moveFocusToPreviousTab(currentTab) {
      var index;
  
      if (currentTab === this.firstTab) {
        this.moveFocusToTab(this.lastTab);
      } else {
        index = this.tabs.indexOf(currentTab);
        this.moveFocusToTab(this.tabs[index - 1]);
      }
    }
  
    moveFocusToNextTab(currentTab) {
      var index;
  
      if (currentTab === this.lastTab) {
        this.moveFocusToTab(this.firstTab);
      } else {
        index = this.tabs.indexOf(currentTab);
        this.moveFocusToTab(this.tabs[index + 1]);
      }
    }
  
    /* EVENT HANDLERS */
  
    onKeydown(event) {
      var tgt = event.currentTarget,
        flag = false;
  
      switch (event.key) {
        case 'ArrowLeft':
          this.moveFocusToPreviousTab(tgt);
          flag = true;
          break;
  
        case 'ArrowRight':
          this.moveFocusToNextTab(tgt);
          flag = true;
          break;
  
        case 'Home':
          this.moveFocusToTab(this.firstTab);
          flag = true;
          break;
  
        case 'End':
          this.moveFocusToTab(this.lastTab);
          flag = true;
          break;
  
        default:
          break;
      }
  
      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    }
  
    onClick(event) {
      this.setSelectedTab(event.currentTarget);
    }
  }
  

export { enhanceDetailGroups }