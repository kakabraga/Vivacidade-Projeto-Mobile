const http = require('http');
const mysql = require('mysql2');
const { parse } = require('querystring'); // Para lidar com o corpo da requisição

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Usuário do MySQL (padrão é root)
  password: '1234',  // Senha do MySQL (deixe vazio se não tiver senha)
  database: 'vivacidade' // Nome do banco de dados
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log('Conectado ao MySQL!');
  }
});

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Rota para verificar a existência da tabela "posts"
  if (url === '/check-table' && method === 'GET') {
    db.query("SHOW TABLES LIKE 'posts'", (err, result) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Erro ao verificar a tabela' }));
      }

      if (result.length > 0) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Tabela "posts" existe no banco de dados.' }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Tabela "posts" não existe no banco de dados.' }));
      }
    });
  } 

  // Rota para criar um novo post
  else if (url === '/posts' && method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        // Parse do corpo da requisição
        const { title, content, image } = JSON.parse(body);

        // Verificação de campos obrigatórios
        if (!title || !content || !image) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Todos os campos (title, content, image) são obrigatórios.' }));
        }

        const sql = 'INSERT INTO posts (title, content, image) VALUES (?, ?, ?)';
        
        db.query(sql, [title, content, image], (err, result) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Erro ao criar o post' }));
          }
          
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Post criado com sucesso!' }));
        });
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Erro ao processar os dados.' }));
      }
    });
  } 
  else if (url === '/posts' && method === 'GET') {
    db.query('SELECT * FROM posts', (err, result) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Erro ao buscar posts' }));
      }
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ posts: result }));
    });
  }
  else if (url.startsWith('/posts/') && method === 'PUT') {
    const postId = url.split('/')[2]; // Pega o ID do post da URL
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
  
    req.on('end', () => {
      const { title, content, image } = JSON.parse(body);
      
      // Verifique se todos os campos estão presentes
      if (!title || !content || !image) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Todos os campos (title, content, image) são obrigatórios.' }));
      }
      
      const sql = 'UPDATE posts SET title = ?, content = ?, image = ? WHERE id = ?';
      
      db.query(sql, [title, content, image, postId], (err, result) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Erro ao atualizar o post' }));
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Post atualizado com sucesso!' }));
      });
    });
  }
  else if (url.startsWith('/posts/') && method === 'DELETE') {
    const postId = url.split('/')[2]; // Pega o ID do post da URL
    
    const sql = 'DELETE FROM posts WHERE id = ?';
    
    db.query(sql, [postId], (err, result) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Erro ao deletar o post' }));
      }
      
      if (result.affectedRows === 0) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Post não encontrado' }));
      }
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Post deletado com sucesso!' }));
    });
  }
  // Rota não encontrada
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Rota não encontrada');
  }
});

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
