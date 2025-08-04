function escapeClassName(className) {
  return className.replace(/:/g, '\\:').replace(/\//g, '\\/');
}

function convertToCSS(className, styles) {
  const esc = escapeClassName(className)

  if (typeof styles === 'string') {
    return `.${esc} { ${styles} }`
  }

  if (typeof styles === 'object') {
    const keys = Object.keys(styles)

    if (keys[0].startsWith('@media')) {
      return keys.map(query => {
        const rules = Object.entries(styles[query])
          .map(([prop, value]) => `  ${prop}: ${value};`)
          .join('\n')
        return `${query} {\n  .${esc} {\n${rules}\n  }\n}`
      }).join('\n\n')
    }

    if (keys[0].startsWith('&')) {
      const selector = keys[0].replace('&', `.${esc}`)
      const rules = Object.entries(styles[keys[0]])
        .map(([prop, value]) => `  ${prop}: ${value};`)
        .join('\n')
      return `${selector} {\n${rules}\n}`
    }

    const rules = Object.entries(styles)
      .map(([prop, value]) => `  ${prop}: ${value};`)
      .join('\n')
    return `.${esc} {\n${rules}\n}`
  }

  return ''
}

function generateUtilitiesCSS(utilities) {
  return Object.entries(utilities)
    .map(([className, styles]) => convertToCSS(className, styles))
    .join('\n\n')
}

export { generateUtilitiesCSS }
