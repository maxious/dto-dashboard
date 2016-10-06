
User.delete_all
Token.delete_all

organisation = Organisation.find_or_create_by!(:name => 'Digital Transformation Office', :url => 'dto.gov.au')
dashboard = Dashboard.first

user = User.new(
  :email => 'dev@localhost',
  :password => 'password',
  :password_confirmation => 'password',
  :organisation => organisation,
  :dashboards => [dashboard])

user.skip_confirmation!
user.save!

Token.create!(:user => user)
