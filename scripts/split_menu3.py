import sys

filepath = r"c:\Users\Joao\Desktop\aa\studiodesign-site\src\components\ui\StaggeredMenu.tsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Modify CSS
css_orig = """.sm-scope[data-scroll-contrast='true'] .staggered-menu-header {
  mix-blend-mode: difference;
}"""
css_new = """.sm-scope[data-scroll-contrast='true'] .staggered-menu-header {
  mix-blend-mode: difference;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}"""
if css_orig in content:
    content = content.replace(css_orig, css_new)

css_logo_orig = """.sm-scope[data-scroll-contrast='true'] .sm-logo,
.sm-scope[data-scroll-contrast='true'] .sm-logo a,
.sm-scope[data-scroll-contrast='true'] .sm-logo .menu-logo-text,
.sm-scope[data-scroll-contrast='true'] .sm-toggle {
  color: #ffffff !important;
  opacity: 0.92;
  filter: none;
}"""

css_logo_new = """.sm-scope[data-scroll-contrast='true'] .sm-logo,
.sm-scope[data-scroll-contrast='true'] .sm-logo a,
.sm-scope[data-scroll-contrast='true'] .sm-logo .menu-logo-text,
.sm-scope[data-scroll-contrast='true'] .sm-toggle {
  color: #ffffff !important;
  opacity: 1;
  filter: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}"""
if css_logo_orig in content:
    content = content.replace(css_logo_orig, css_logo_new)
    
css_icon_orig = """.sm-scope[data-scroll-contrast='true'] .sm-icon-line {
  background-color: #ffffff !important;
}"""
css_icon_new = """.sm-scope[data-scroll-contrast='true'] .sm-icon-line {
  background-color: #ffffff !important;
  -webkit-font-smoothing: antialiased;
}"""
if css_icon_orig in content:
    content = content.replace(css_icon_orig, css_icon_new)


# Modify DOM
# Find the start of the return statement
start_idx = content.find('  return (\n    <div\n      className={`sm-scope')
if start_idx == -1:
    print("Start not found")
    sys.exit(1)

# Extract the header block
header_start = content.find('        <header\n          className="staggered-menu-header')
header_end = content.find('        </header>\n\n        <aside')

if header_start == -1 or header_end == -1:
    print("Header block not found")
    sys.exit(1)

header_block = content[header_start:header_end + 17] # include </header>

# Now replace the original wrapper opening
orig_wrapper = """    <div
      className={`sm-scope z-40 ${
        isHidden ? 'opacity-0' : 'opacity-100'
      } ${isFixed ? 'fixed inset-0 overflow-hidden pointer-events-none' : 'h-full w-full'}`}
      aria-hidden={isHidden}
      data-hidden={isHidden || undefined}
      data-scroll-contrast={scrollContrastActive || undefined}
    >
      <div
        className={`${className ? `${className} ` : ''}staggered-menu-wrapper relative z-40 h-full w-full pointer-events-none`}
        style={wrapperStyle}
        data-open={open || undefined}
        data-position={position}
      >"""

new_wrapper = """    <>
      {/* Container 1: Panel & Prelayers */}
      <div
        className={`sm-scope sm-scope-panel z-40 ${
          isHidden ? 'opacity-0' : 'opacity-100'
        } ${isFixed ? 'fixed inset-0 overflow-hidden pointer-events-none' : 'absolute inset-0 pointer-events-none'}`}
        aria-hidden={isHidden}
        data-hidden={isHidden || undefined}
      >
        <div
          className={`${className ? `${className} ` : ''}staggered-menu-wrapper relative h-full w-full pointer-events-none`}
          style={wrapperStyle}
          data-open={open || undefined}
          data-position={position}
        >"""

if orig_wrapper in content:
    content = content.replace(orig_wrapper, new_wrapper)
else:
    print("Wrapper not found")
    sys.exit(1)

# Remove the original header block from its place
content = content.replace(header_block + "\n\n", "")

# Insert the header block after the panel closes
orig_closing = """        </aside>
      </div>

      <style>"""

new_closing = """        </aside>
      </div>
    </div>

      {/* Container 2: Header */}
      <div
        className={`sm-scope sm-scope-header z-50 ${
          isHidden ? 'opacity-0' : 'opacity-100'
        } ${isFixed ? 'fixed inset-0 pointer-events-none' : 'absolute inset-0 pointer-events-none'}`}
        aria-hidden={isHidden}
        data-hidden={isHidden || undefined}
        data-scroll-contrast={scrollContrastActive || undefined}
      >
        <div
          className={`${className ? `${className} ` : ''}staggered-menu-wrapper relative h-full w-full pointer-events-none`}
          style={wrapperStyle}
          data-position={position}
        >
""" + header_block + """
        </div>
      </div>

      <style>"""

if orig_closing in content:
    content = content.replace(orig_closing, new_closing)
else:
    print("Closing not found")
    sys.exit(1)
    
orig_final_close = """      `}</style>
    </div>
  );
};"""

new_final_close = """      `}</style>
    </>
  );
};"""

if orig_final_close in content:
    content = content.replace(orig_final_close, new_final_close)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Success")
