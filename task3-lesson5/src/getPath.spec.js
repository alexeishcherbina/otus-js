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
        <ul>
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

});