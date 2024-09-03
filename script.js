let themes = {
  default:
    "https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/themes/prism.min.css",
  dark:
    "https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/themes/prism-tomorrow.min.css",
};

const state = {
  concept: null,
  language: "javascript",
  theme: "dark",
  topic: null,
  title: "JavaScript Vocabulary"
}

vocab = {
  javascript: {
    title: "JavaScript Vocabulary"
  },
  java: {
    title: "Java Vocabulary"
  },
  csharp: {
    title: "C# Vocabulary"
  },
  typescript: {
    title: "TypeScript Vocabulary"
  },
  ruby: {
    title: "Ruby on Rails Vocabulary"
  }
}

const concepts = [
  {
    title: "Data Types",
    collapsible: true,
    children: [
      ["data-type", "Data Type"],
      ["primitive", "Primitive Type"],
      ["reference", "Reference Type"],
    ],
  },
  {
    title: "Variables",
    collapsible: true,
    children: [
      ["variable-declaration", "Variable Declaration"],
      ["variable-init", "Variable Initialization"],
      ["variable-declare-init", "Declaration & Initialization"],
    ],
  },
  {
    title: "Conditionals",
    collapsible: true,
    children: [["expression-boolean", "Boolean Expression"]],
  },
  {
    title: "Loops",
    collapsible: true,
    children: [
      ["for-loop", "For Loop"],
      ["loop-init", "Loop Initialization"],
      ["loop-condition", "Loop Condition"],
      ["loop-iterator", "Loop Iterator"],
    ],
  },
  {
    title: "Arrays",
    collapsible: true,
    children: [
      ["array-type", "Array Type"],
      ["element-type", "Element Type"],
      ["array-init", "Array Initialization"],
      ["array-index", "Index/Subscript"],
      ["array-property", "Array Property"]
    ],
  },
  {
    title: "Methods",
    collapsable: true,
    children: [
      ["method", "Method"],
      ["method-sig", "Method Signature"],
      ["method-name", "Method Name"],
      ["parameter-list", "Parameter List"],
      ["return-type", "Return Type"],
      ["method-call", "Method Call"],
    ],
  },
  {
    title: "Classes and Objects",
    collapsible: true,
    children: [
      ["class-block", "Class"],
      ["constructor", "Constructor"],
      ["class-property", "Properties"],
      ["getter", "Getters"],
    ],
  },
];

function loadConceptList() {
  let index = 0;
  concepts.forEach((concept) => {
    const parent = document.getElementById("sidebar-groups");

    // Build Sidebar Headings
    const heading = document.createElement("section");
    heading.classList.add("sidebar-group");
    const p = document.createElement("p");
    p.innerText = concept.title;
    p.classList.add("sidebar-heading");
    heading.appendChild(p);
    const ul = document.createElement("ul");
    ul.classList.add("sidebar-links", "sidegar-group-links");
    ul.style.display = "inline-block";

    //Build submenus
    concept.children.forEach((child) => {
      li = document.createElement("li");
      a = document.createElement("a");
      a.classList.add("sidebar-link");
      a.setAttribute("href", "#" + child[0]);
      a.innerText = child[1];
      a.setAttribute("concept-name", child[0]);
      li.appendChild(a);

      a.addEventListener("click", (e) => {
        selectConcept(e, child[0]);
      }); 
      ul.appendChild(li);
    });
    heading.appendChild(ul);
    parent.appendChild(heading);
  });
}

function selectConcept(e, choice) {
  if (state.concept === choice) {
    clearSelection();
  } else {
    clearSelection();
    e.target.classList.add("selected-concept");
    let els = Array.from(document.getElementsByClassName(choice));
    els.forEach((item) => {
      item.classList.add("selected-concept");
    });
    state.concept = choice;
  }
}

document.querySelector(".bottom").addEventListener("click", (e) => {
  selectedTheme = e.target.id;

  document.querySelector(".theme").classList.remove(state.theme + "-theme");
  document.querySelector(".theme").classList.add(selectedTheme + "-theme");
  state.theme = selectedTheme;
  document.getElementById("prismstyle").href = themes[e.target.id];
  localStorage.setItem("themePref", e.target.id);
});

document
  .querySelector(".theme-switcher.hidden")
  .addEventListener("change", (e) => {
    state.theme = e.target.checked ? "dark" : "default";
    localStorage.setItem("themePref", state.theme);
    setTheme(e.target.checked ? "dark" : "default");
  });

function clearSelection() {
  document.querySelectorAll(".selected-concept").forEach((e) => {
    e.classList.remove("selected-concept");
  });
  state.concept = null;
}

document.querySelectorAll(".lang-btn").forEach((item) => {
  item.addEventListener("click", (e) => {
    
    if (e.target.dataset.lang !== state.language)  {
      state.language = e.target.dataset.lang;
      setLang();
    }
   
  });
});


function setLang() {
  state.title = vocab[state.language].title;
  document.title = state.title;
  localStorage.setItem("languagePref", state.language);
  document.querySelector(".site-name").innerText = state.title;
  setLangBtnState();
  setCodeVisibility();
}

function setLangBtnState() {
  Array.from(document.querySelectorAll(".lang-btn")).forEach((btn) => {
    if(btn.dataset.lang === state.language) {
      btn.classList.remove("deselected");
      btn.classList.add("selected");
    } else {
      btn.classList.remove("selected");
      btn.classList.add("deselected");
    }
  });
}

function setCodeVisibility() {
  Array.from(document.getElementsByTagName("PRE")).forEach((pre) => {
    if(pre.classList.contains("language-" + state.language)) {
      pre.classList.remove("hidden");
    } else {
      pre.classList.add("hidden");
    }
    
  });
}

function setPageTitle() {
  title = langs[langs.findIndex(x => state.language === x.name)].title;
  document.querySelector(".site-name").innerText = title;
  document.title = state.title[state.language];
}

document.addEventListener("readystatechange", () => {
 
  if(document.readyState === "interactive") {
    state.language = localStorage.getItem("languagePref") ?? state.language;
    setLang();
    state.theme = localStorage.getItem("themePref") ?? state.theme;
    document.getElementById("prismstyle").href = themes[state.theme];
  }
});

document.addEventListener("DOMContentLoaded", () => {

  setTheme(localStorage.getItem("themePref") ?? state.theme);
  loadConceptList();
  //state.concept = getAnchor();
});

function setTheme(theme) {
  if (theme === "dark") {
    state.theme = "dark";
    document.querySelector(".theme-switcher.hidden").checked = true;
    document.querySelector(".theme").classList.remove("default-theme");
    document.querySelector(".theme").classList.add("dark-theme");
  } else {
    state.theme = "default";
    document.querySelector(".theme-switcher.hidden").checked = false;
    document.querySelector(".theme").classList.remove("dark-theme");
    document.querySelector(".theme").classList.add("default-theme");
  }
  document.getElementById("prismstyle").href = themes[state.theme];
}

/* Deep link to anchor?
function getAnchor() {
  anchor = null;
  if (document.URL.includes("#")) {
    anchor = document.URL.slice(document.URL.indexOf("#") + 1);
  }
  return anchor;
}
*/