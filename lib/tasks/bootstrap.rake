namespace :bootstrap do
  desc "Creates an admin user"

  task :admin_user => :environment  do
    if ENV['ADMIN_EMAIL'] && ENV['ADMIN_PASSWORD']
      user = User.new(:email => ENV['ADMIN_EMAIL'], :password => ENV['ADMIN_PASSWORD'], :password_confirmation => ENV['ADMIN_PASSWORD'])
      user.skip_confirmation!
      user.save!
    end
  end

  task :sandbox_user => :environment  do

    if ENV['SANDBOX_USER']
      data = JSON.parse(ENV['SANDBOX_USER'])

      User.where(:email => data['email']).delete_all
      Token.where(:token => data['token']).delete_all

      user = User.new(:email => data['email'], :password => data['password'], :password_confirmation => data['password'])
      user.dashboards << Dashboard.find(data['dashboard_id'])
      user.skip_confirmation!
      user.save!

      Token.create!(:user => user, :token => data['token'])
    end

  end

end
