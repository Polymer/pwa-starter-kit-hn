import webapp2
import urllib2

class ApiHandler(webapp2.RequestHandler):
  def get(self, path):
    url = 'http://node-hnapi.herokuapp.com/' + path + '?' + self.request.query_string
    result = urllib2.urlopen(url)
    self.response.headers['cache-control'] = 'public, max-age=60'
    self.response.headers['content-type'] = 'application/json'
    self.response.write(result.read())

app = webapp2.WSGIApplication([
  ('/api/(.*)', ApiHandler),
], debug=True)
