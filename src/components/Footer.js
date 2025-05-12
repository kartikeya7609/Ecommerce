import React from 'react'

export default function Footer() {
  return (
    <div className='bg-dark p-5 text-light footer-container'>
       <div className="footer-content">
            <div className="footer-section">
                <h3>Join my network!</h3>
                <div className="social-apps">
                    <a href="https://www.linkedin.com/in/meher-sri-kartikeya-kotha-135997217?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="social-app">
                        <i className="fab fa-linkedin"></i>
                        <span>LinkedIn</span>
                    </a>
                    <a href="https://github.com/kartikeya7609" target="_blank" rel="noopener noreferrer" className="social-app">
                        <i className="fab fa-github"></i>
                        <span>GitHub</span>
                    </a>
                    <a href="https://x.com/kotha_mehe43188?t=lrtyEi8LmHWoNPbtlLMfYQ&s=09" target="_blank" rel="noopener noreferrer" className="social-app">
                        <i className="fa-sharp-duotone fa-solid fa-x"></i>
                        <span>X</span>
                    </a>
                    <a href="https://www.instagram.com/k_m_s_k_7" target="_blank" rel="noopener noreferrer" className="social-app">
                        <i className="fab fa-instagram"></i>
                        <span>Instagram</span>
                    </a>
                </div>
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; 2025 Kartikeya. All rights reserved.</p>
            <p>Built with <i className="fas fa-heart" ></i> and <i className="fas fa-code"></i></p>
        </div>
    </div>
  )
}