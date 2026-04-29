import re
import sys

def modify_staggered_menu():
    filepath = r"c:\Users\Joao\Desktop\aa\studiodesign-site\src\components\ui\StaggeredMenu.tsx"
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Update the CSS: move mix-blend-mode to .staggered-menu-header and remove from .sm-scope
    css_target = """.sm-scope[data-scroll-contrast='true'] {
  mix-blend-mode: difference;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.sm-scope[data-scroll-contrast='true'] .staggered-menu-panel,
.sm-scope[data-scroll-contrast='true'] .sm-prelayers {
  isolation: isolate;
  mix-blend-mode: normal;
}"""
    css_replacement = """.sm-scope[data-scroll-contrast='true'] .staggered-menu-header {
  mix-blend-mode: difference;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}"""
    
    if css_target in content:
        content = content.replace(css_target, css_replacement)
    else:
        print("CSS target not found!")
    
    # 2. Extract the header and the rest of the component
    # We need to split the single return <div className="sm-scope..."> into a fragment <> ... </>
    
    # Find the start of the return statement
    return_start = content.find('  return (\n    <div\n      className={`sm-scope')
    if return_start == -1:
        print("Return statement not found!")
        return

    # Let's use regex to find the header block exactly
    header_regex = re.compile(r'(\s*<header\s+className="staggered-menu-header[^>]+>.*?</header>)', re.DOTALL)
    header_match = header_regex.search(content, return_start)
    if not header_match:
        print("Header not found!")
        return
    
    header_block = header_match.group(1)
    
    # Let's replace the single sm-scope structure
    # Original top wrapper:
    orig_wrapper_start = """    <div
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
    
    new_wrapper_start = """    <>
      {/* SCOPE 1: PANEL & PRELAYERS */}
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
        
    new_header_scope = """      {/* SCOPE 2: HEADER */}
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
%s
        </div>
      </div>
""" % header_block

    if orig_wrapper_start in content:
        content = content.replace(orig_wrapper_start, new_wrapper_start)
    else:
        print("Original wrapper start not found!")
    
    # Remove header block from the original place
    content = content.replace(header_block, "")
    
    # Insert new header scope before the <style> tag
    style_idx = content.find('      <style>{`')
    if style_idx != -1:
        content = content[:style_idx] + "      </div>\n    </div>\n\n" + new_header_scope + content[style_idx:]
    else:
        print("Style tag not found!")
        
    # Fix the closing tags. The original code had:
    #         </aside>
    #       </div>
    #     </div>
    #     <style>...
    # We replaced orig_wrapper_start with new_wrapper_start but left the closing tags.
    # We already inserted the closing tags before the style tag in the previous step. Wait, let's fix it properly.
    
    # We can just replace the old closing tags before the style
    old_closing = """        </aside>
      </div>
    </div>

      <style>"""
    
    new_closing = """        </aside>
      </div>
    </div>

""" + new_header_scope + """      <style>"""
    
    # But wait, we already added it above. Let's start over with a safer string replace.
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Modification script executed.")

modify_staggered_menu()
