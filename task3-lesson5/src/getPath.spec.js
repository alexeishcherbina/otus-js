const getPath = require('./getPath');

describe('getPath', () => {
  document.body.innerHTML = `
    <header>
      <ul>
        <li>1</li>
        <li class="li-2">2</li>
        <li>3</li>
      <ul/>
    </header>
    <main>
      <section class="section">
        <div>
          <ul>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
          </ul>        
        </div>
      </section>
      <section>
        <ul id="ul_in_last_section">
          <li>8</li>
          <li class="li-9">9</li>
          <li>10</li>
          <li>11</li>
        </ul>
      </section>
    </main>`;


  it('should find right section', () => {
      const section = document.querySelector('.section');
      expect(document.querySelector(getPath(section))).toBe(section);
  });

  it('should find only one section', () => {
    const section = document.querySelector('.section');
    expect(document.querySelectorAll(getPath(section)).length).toBe(1);
  });

  it('should find shortly if has id', () => {
    const li = document.querySelector('.li-9');
    expect(getPath(li)).toBe('#ul_in_last_section>LI.li-9:nth-child(2)');
  });

});