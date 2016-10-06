class User < ApplicationRecord
  devise :database_authenticatable, :confirmable, :lockable, :recoverable, :rememberable, :timeoutable, :trackable, :validatable

  has_many :tokens do
    def expire
      update(:expired_at => Time.zone.now)
    end
  end

  belongs_to :organisation

  has_and_belongs_to_many :dashboards

  has_many :datasets, :through => :organisations

  has_many :datapoints, :through => :datasets

  has_many :widgets, :through => :dashboards

  has_many :organisations, :through => :dashboards

  def self.by_email
    order(:email => 'ASC')
  end

  def self.authenticate!(token)
    Token.authenticate!(token).user
  end

  def expire_session_tokens
    tokens.session.expire
  end

  def generate_session_token!
    expire_session_tokens
    tokens.create!(:session => true)
  end

  def after_database_authentication
    generate_session_token! if confirmed?
  end

  def token
    tokens.active.first
  end

  def api_token
    tokens.api.active.first
  end

  def session_token
    tokens.session.active.first
  end

  def to_s
    email
  end
end
