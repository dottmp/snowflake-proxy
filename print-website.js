function asciiPrint(el, text, { chunkSize = 16, delay = 0, oncomplete } = {}) {
  const chars = [...text].reverse();

  let banner = "";

  function tick() {
    const chunk = Array(chunkSize)
      .fill(null)
      .map(() => chars.pop() ?? "")
      .join("");

    if (!chunk) {
      el.textContent = banner;
      oncomplete?.();
      return;
    }

    banner += chunk;
    el.textContent = banner + "█";

    if (delay > 0) {
      setTimeout(tick, delay);
    } else {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

// ---------------------------------------------------------------------------
// Banners
// ---------------------------------------------------------------------------

const banner = `
      ::::::::  ::::    :::  ::::::::  :::       ::: :::::::::: :::            :::     :::    ::: ::::::::::          :::::::::  :::::::::   ::::::::  :::    ::: :::   ::: 
    :+:    :+: :+:+:   :+: :+:    :+: :+:       :+: :+:        :+:          :+: :+:   :+:   :+:  :+:                 :+:    :+: :+:    :+: :+:    :+: :+:    :+: :+:   :+:  
   +:+        :+:+:+  +:+ +:+    +:+ +:+       +:+ +:+        +:+         +:+   +:+  +:+  +:+   +:+                 +:+    +:+ +:+    +:+ +:+    +:+  +:+  +:+   +:+ +:+    
  +#++:++#++ +#+ +:+ +#+ +#+    +:+ +#+  +:+  +#+ :#::+::#   +#+        +#++:++#++: +#++:++    +#++:++#            +#++:++#+  +#++:++#:  +#+    +:+   +#++:+     +#++:      
        +#+ +#+  +#+#+# +#+    +#+ +#+ +#+#+ +#+ +#+        +#+        +#+     +#+ +#+  +#+   +#+                 +#+        +#+    +#+ +#+    +#+  +#+  +#+     +#+        
#+#    #+# #+#   #+#+# #+#    #+#  #+#+# #+#+#  #+#        #+#        #+#     #+# #+#   #+#  #+#                 #+#        #+#    #+# #+#    #+# #+#    #+#    #+#         
########  ###    ####  ########    ###   ###   ###        ########## ###     ### ###    ### ##########          ###        ###    ###  ########  ###    ###    ###          
                                                                                                                                                                            
                                                                                                                                                                            
                                                                                                                                                 snowflake proxy 

                                                                                                                                                             by tor`;

const footer = `
Enable snowflake proxy and leave it on to donate bandwith and help tor users bypass censorship and access internet freely.

click "Learn more" to find out how snowflake proxy works and how to set it up on your own website.`;

// ---------------------------------------------------------------------------
// Print
// ---------------------------------------------------------------------------

asciiPrint(document.getElementById("ascii-banner"), banner, {
  chunkSize: 24,
  oncomplete: () => {
    const showProxy = document.getElementById("proxy");

    showProxy.classList.remove("hidden");

    asciiPrint(document.getElementById("ascii-footer"), footer, {
      chunkSize: 4,
    });
  },
});
